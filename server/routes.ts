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

      // Use Mixpanel JQL API to query user profile
      const credentials = Buffer.from(`${username}:${password}`).toString('base64');
      const mixpanelUrl = 'https://mixpanel.com/api/2.0/jql';

      // JQL query to find user by email
      const jqlScript = `
        function main() {
          return People()
            .filter(function(p){
              return p && p.properties && p.properties.$email === ${JSON.stringify(email)};
            })
            .map(function(p){
              var x = p.properties || {};
              return {
                email: x.$email || null,
                firstName: x["First Name"] || null,
                lastName: x["Last Name"] || null,
                registrationDate: x["Registration Date"] || null,
                deviceSerial: x["MLM2 Last Serial Number"] || null,
                subscriptionType: x["MLM2 Latest Subscription Type"] || null,
                firstConnectDate: x["MLM2 First Connect Date"] || null,
                lastConnectDate: x["MLM2 Last Connect Date"] || null,
                sessionCount: x["MLM2 Number of Sessions"] || null,
                capturedShots: x["MLM2 Success Shot Count"] || null,
                phoneType: x["MLM2 Phone Type"] || null,
                appVersion: x["MLM2 App Version"] || null,
                firmwareVersion: x["MLM2 Firmware Version"] || null,
                lastPlayed: x["MLM2 Last Played"] || null,
                subscriptionStartDate: x["MLM2 Latest Subscription Start Date"] || null,
                subscriptionEndDate: x["MLM2 Latest Subscription Expire Date"] || null,
                age: x["Age"] || null,
                handedness: x["Handedness"] || null,
                e6ConnectKey: x["E6 CONNECT"] || null
              };
            });
        }
      `;

      const response = await fetch(mixpanelUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `script=${encodeURIComponent(jqlScript)}&project_id=${projectId}`
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Mixpanel API error:", response.status, response.statusText, errorText);
        return res.status(400).json({ 
          error: "Please make sure to use the email associated with your MLM2PRO App" 
        });
      }

      const data = await response.json();
      
      if (!data || data.length === 0) {
        return res.status(404).json({ 
          error: "Please make sure to use the email associated with your MLM2PRO App" 
        });
      }

      const userProfile = data[0];

      // Extract and format profile data
      const profileData = {
        firstName: userProfile.firstName || "User",
        lastName: userProfile.lastName || "",
        email: userProfile.email || email,
        deviceSerial: userProfile.deviceSerial,
        registrationDate: userProfile.registrationDate,
        subscriptionType: userProfile.subscriptionType,
        firstConnectDate: userProfile.firstConnectDate,
        lastConnectDate: userProfile.lastConnectDate,
        sessionCount: userProfile.sessionCount,
        capturedShots: userProfile.capturedShots,
        phoneType: userProfile.phoneType,
        appVersion: userProfile.appVersion,
        firmwareVersion: userProfile.firmwareVersion,
        lastPlayed: userProfile.lastPlayed,
        subscriptionStartDate: userProfile.subscriptionStartDate,
        subscriptionEndDate: userProfile.subscriptionEndDate,
        age: userProfile.age,
        handedness: userProfile.handedness,
        e6ConnectKey: userProfile.e6ConnectKey
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
