import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Mixpanel Profile Lookup API
  app.post("/api/mixpanel/profile", async (req, res) => {
    // Rate limiting by IP
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: "Too many requests. Please try again later." 
      });
    }
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const projectId = process.env.MIXPANEL_PROJECT_ID;
      const username = process.env.MIXPANEL_SERVICE_ACCOUNT_USERNAME;
      const password = process.env.MIXPANEL_SERVICE_ACCOUNT_PASSWORD;

      if (!projectId || !username || !password) {
        console.error("Missing Mixpanel credentials");
        return res.status(500).json({ error: "Server configuration error" });
      }

      // Query Mixpanel Engage API for user profile by email
      const credentials = Buffer.from(`${username}:${password}`).toString('base64');
      const mixpanelUrl = `https://mixpanel.com/api/app/projects/${projectId}/engage/users/by-distinct-id`;

      const response = await fetch(mixpanelUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          distinct_ids: [email]
        })
      });

      if (!response.ok) {
        console.error("Mixpanel API error:", response.status, response.statusText);
        return res.status(response.status).json({ 
          error: "Failed to fetch user profile from Mixpanel" 
        });
      }

      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        return res.status(404).json({ 
          error: "User not found. Please check your email address." 
        });
      }

      const userProfile = data.results[0];
      const properties = userProfile.$properties || {};

      // Extract and format only necessary properties (no sensitive data)
      const profileData = {
        firstName: properties.$first_name || properties.first_name || "User",
        lastName: properties.$last_name || properties.last_name || "",
        email: properties.$email || email,
        deviceSerial: properties.device_serial || properties.DeviceSerial,
        purchaseDate: properties.purchase_date || properties.PurchaseDate,
        productName: properties.product_name || properties.ProductName || "MLM2PRO",
        registrationDate: properties.$created || properties.registration_date,
        city: properties.$city,
        region: properties.$region,
        country: properties.$country_code
      };

      res.json({ 
        success: true,
        profile: profileData 
      });

    } catch (error: any) {
      console.error("Error fetching Mixpanel profile:", error);
      res.status(500).json({ 
        error: "Internal server error",
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
