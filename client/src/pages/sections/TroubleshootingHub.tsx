import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Battery, Wifi, Settings, Target, Play, Zap, Cloud, AlertCircle } from "lucide-react";
import {
  trackSectionView,
  trackSectionExpanded,
  trackTopicExpanded,
  trackExternalLink,
  useSearchTracking,
} from "@/lib/mixpanel";

interface SubTopic {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  content: string;
  hasVideo?: boolean;
}

interface TroubleshootingSection {
  id: string;
  title: string;
  subtitle: string;
  topics: SubTopic[];
}

const SECTIONS: TroubleshootingSection[] = [
  {
    id: "quick-start",
    title: "Quick Start",
    subtitle: "Power up, connect, and update your device",
    topics: [
      {
        id: "power-charging",
        icon: Battery,
        title: "Power & Charging",
        description: "Get 4 hours of practice per charge",
        hasVideo: false,
        content: `Fully charge your device before first use with a 5V/2A–3A (15W) adapter. Use the LED indicators to understand status.

**Quick facts:**
- **Charge time:** ~1 hour to full charge
- **Battery life:** ~4 hours of use per charge
- **LED indicators:** Amber = charging, off = fully charged, flashing red = low battery
- **Firmware updates:** Charge to 75%+ before updating

**Checklist:**
- Use 5V/3A (15W) adapter when possible (minimum 5V/2A)
- Verify amber LED turns off when fully charged
- Keep device plugged in during firmware updates

**References:**
- [Battery/Charging: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44182673173779-Battery-Charging-MLM2PRO)
- [LED Indicator: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44182728192915-LED-Indicator-MLM2PRO)`
      },
      {
        id: "connect-device",
        icon: Wifi,
        title: "Connect Your Device",
        description: "Direct Wi-Fi or Local Network setup",
        hasVideo: true,
        content: `Use Quick Connect to auto-reconnect. Choose Direct Wi-Fi for ranges/weak Wi-Fi; choose Local Network for home setups and 3rd-party apps.

**Watch the Device Info tutorial:**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/qMtR1Nx96NY?rel=0&modestbranding=1&playsinline=1"
    title="Device Info Page Tutorial"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**Watch: Establishing a Local WiFi Network Connection**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/i1l3XgoamWE?rel=0&modestbranding=1&playsinline=1"
    title="Establishing a Local WiFi Network Connection"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**First-time setup:**
1. Power on device and open MLM2PRO app
2. Go to Profile > Connect MLM2PRO
3. Choose connection type and follow prompts
4. Enable Quick Connect for faster reconnection

**Connection modes:**
- **Direct Wi-Fi:** Best for driving ranges or weak Wi-Fi
- **Local Network:** Required for Courses (Android), firmware updates, and 3rd-party apps

**Can't connect? Try this:**
- Use MLM2PRO app (not the old MLM app)
- Enable Bluetooth and all app permissions
- Remove magnetic phone cases
- Toggle off Quick Connect or reinstall app

**References:**
- [Connection: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183237516819-Connection-MLM2PRO)`
      },
      {
        id: "firmware-update",
        icon: Settings,
        title: "Update Firmware",
        description: "Critical first step for best performance",
        hasVideo: true,
        content: `Update firmware right away for best stability and features. Keep the device plugged in and the app open during updates.

**Watch the firmware update tutorial:**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/sr6BEY5HmHc?rel=0&modestbranding=1&playsinline=1"
    title="Firmware Update Tutorial"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**Update process:**
1. Connect in Direct mode with cellular to download
2. Enable Airplane Mode (keep Wi-Fi/Bluetooth on)
3. Install the update
4. Keep app open and device plugged in until complete

**Update failing? Try this:**
- Reinstall the app
- Connect via Local Wi-Fi from Profile
- Ensure 75%+ battery charge
- Hard reset: hold power button 20 seconds

**References:**
- [Firmware: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184980737171-Firmware-MLM2PRO)
- [General Troubleshooting](https://rapsodo.zendesk.com/hc/en-us/articles/44378085420307-General-Troubleshooting-MLM2PRO)`
      },
      {
        id: "account-membership",
        icon: Cloud,
        title: "Account & Membership",
        description: "Activate Premium trial and R-Cloud access",
        hasVideo: false,
        content: `Sign in to the MLM2PRO app and activate your included Premium membership trial through R-Cloud to unlock simulation, measured spin, and advanced features.

**What's included in Premium:**
- Simulation access (Range/Courses/3rd-party)
- Measured spin/spin axis with RPT balls
- R-Speed training
- Insights and Combines
- Expanded cloud storage

**How to activate:**
1. Log into R-Cloud with your MLM2PRO account
2. Select Start Trial under annual membership
3. Manage subscription anytime in R-Cloud > Profile

**Billing management:**
- **Web subscription:** Manage in R-Cloud > Profile > Manage Membership
- **Apple/Google purchase:** Manage in your app store subscription settings
- **Duplicate subscriptions?** Email support with both account emails

**References:**
- [Membership: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183693527955-Membership-MLM2PRO)
- [FAQ's: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44377947274899-FAQ-s-MLM2PRO)`
      }
    ]
  },
  {
    id: "space-setup",
    title: "Space Setup & Alignment",
    subtitle: "Position your device for accurate data",
    topics: [
      {
        id: "alignment-leveling",
        icon: Target,
        title: "Alignment & Leveling",
        description: "Get your device properly positioned",
        hasVideo: true,
        content: `Align the device to your target line and level it on the tripod before starting sessions. Proper positioning is critical for accurate data.

**Watch: MLM2PRO Alignment Set-Up**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/ErWu4kvDYkM?rel=0&modestbranding=1&playsinline=1"
    title="MLM2PRO Alignment Set-Up"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**Distance and placement:**
- **Standard:** Place MLM2PRO 6.5–8 ft behind the ball
- **Club Data:** Place ball ~7.5 ft from unit inside orange hitting zone on screen
- **Ball flight:** Allow ~8 ft from ball to net/screen

**Setup steps:**
1. Position device on stable, flat surface
2. Use on-screen alignment line to aim at target
3. Verify leveling feedback in app before starting session
4. Confirm dexterity setting (left/right-handed)

**Pro tips:**
- Ensure tripod is fully extended and stable
- Re-check alignment if you move the device
- Set dexterity in Profile > App Settings

**References:**
- [Aligning/Level for Club Data](https://rapsodo.zendesk.com/hc/en-us/articles/43994468301459-Aligning-and-Level-Your-Rapsodo-MLM2PRO-for-NEW-Club-Data)
- [FAQ's](https://rapsodo.zendesk.com/hc/en-us/articles/44377947274899-FAQ-s-MLM2PRO)`
      }
    ]
  },
  {
    id: "app-configuration",
    title: "App Configuration",
    subtitle: "Set up My Bag, elevation, and ball settings",
    topics: [
      {
        id: "my-bag",
        icon: Settings,
        title: "My Bag",
        description: "Quick club switching for practice",
        hasVideo: false,
        content: `Configure My Bag ahead of time for easy club selection during sessions. You can customize your bag and manage club inventory.

**How it works:**
- Add all your clubs before your first session
- At least one club must remain in My Bag
- Move clubs to Inventory if you want to swap equipment

**Setup:**
1. Open Profile > My Bag
2. Add clubs with loft and specifications
3. Organize clubs in order you prefer
4. Switch clubs easily during practice sessions

**References:**
- [My Bag: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44185021439507-My-Bag-MLM2PRO)`
      },
      {
        id: "elevation-ball-type",
        icon: Settings,
        title: "Elevation & Ball Type",
        description: "Improve data accuracy with correct settings",
        hasVideo: false,
        content: `Set elevation based on your location and choose the correct ball type at session start for the most accurate metrics.

**Elevation:**
- Set at the start of each session
- Improves carry distance calculations
- Adjust when practicing at different locations

**Ball type selection:**
- **RPT balls:** Enable measured spin rate and spin axis (Premium required)
- **Premium/range balls:** Standard metrics without measured spin
- Choose correctly to ensure accurate data

**Why it matters:**
RPT balls have unique markings that allow the dual cameras to measure actual spin data, not just estimate it.

**References:**
- [Elevation: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183851507603-Elevation-MLM2PRO)
- [Spin Information](https://rapsodo.zendesk.com/hc/en-us/articles/44182520056211-Spin-Information-MLM2PRO)`
      }
    ]
  },
  {
    id: "first-practice",
    title: "First Session",
    subtitle: "Understanding metrics and getting started",
    topics: [
      {
        id: "indoor-accuracy",
        icon: AlertCircle,
        title: "Indoor Accuracy Tips",
        description: "Understanding indoor vs outdoor results",
        hasVideo: false,
        content: `Indoor swing speeds and carry distances are often lower at first. This is normal "indoor swing syndrome" and improves with practice.

**Why indoor numbers feel low:**
- Subconscious swing adjustment into a net
- Different visual feedback vs outdoor range
- Adaptation period for most golfers

**What to do:**
- Continue practicing regularly
- Compare like-for-like sessions (same club, same day)
- Track improvement over time
- Don't compare directly to outdoor range sessions

**Pro tip:**
Speed and confidence improve with consistent indoor practice. Focus on swing mechanics and relative improvements, not absolute yardages.

**References:**
- [Inaccuracies (indoor swing syndrome)](https://rapsodo.zendesk.com/hc/en-us/articles/44185264868755-Inaccuracies-MLM2PRO)`
      },
      {
        id: "practice-basics",
        icon: Play,
        title: "Session Basics",
        description: "Start hitting and tracking your shots",
        hasVideo: true,
        content: `Start a Practice session to see real-time ball flight, video replay, and 15 data metrics. The device captures everything automatically.

**Watch: Target Range Practice Mode**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/06evjEOfF6c?rel=0&modestbranding=1&playsinline=1"
    title="Target Range Practice Mode"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**Getting started:**
1. Position device 6.5–8 ft behind ball
2. Start Practice session in app
3. Select club from My Bag
4. Hit shots and review metrics immediately

**What's measured vs calculated:**
- **Measured (6 metrics):** Club speed, ball speed, launch angle, launch direction, spin rate*, spin axis*
- **Calculated:** Carry, total distance, apex, flight time, side distance, etc.
- *Spin requires RPT balls and Premium membership

**Checklist:**
- Verify space: 6.5–8 ft behind ball, ~8 ft to net
- Use RPT balls for measured spin data
- Confirm video and metrics are recording

**References:**
- [Metrics/Features](https://rapsodo.zendesk.com/hc/en-us/articles/44183787338515-Metrics-Features-MLM2PRO)
- [Spin Information](https://rapsodo.zendesk.com/hc/en-us/articles/44182520056211-Spin-Information-MLM2PRO)`
      }
    ]
  },
  {
    id: "simulation",
    title: "Simulation (Range & Courses)",
    subtitle: "Play 30K+ courses on your mobile device",
    topics: [
      {
        id: "simulation-basics",
        icon: Play,
        title: "Getting Started",
        description: "Range, Courses, and projection options",
        hasVideo: true,
        content: `Play courses and practice ranges on your mobile device. Project to a larger screen via HDMI or wireless mirroring for the full simulator experience.

**Watch the Rapsodo Range tutorial:**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/eZrs2dG--is?rel=0&modestbranding=1&playsinline=1"
    title="Rapsodo Range Tutorial"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**How to start:**
1. Connect device in Local Network mode (recommended)
2. Choose Range or Courses from Play tab
3. Select your course or range
4. Start playing

**Projection options:**
- **HDMI adapter:** Lightning (iOS) or USB-C (Android) to HDMI
- **Wireless mirroring:** AirPlay or Chromecast to TV
- **Direct play:** Use mobile device screen only

**Multiplayer:**
- Add up to 4 additional players on Courses
- Only Player 1's data is saved to R-Cloud

**Platform notes:**
- **Android:** Must use Local Network mode for Courses
- **iOS:** Local Network or Direct mode (Direct requires cellular)

**References:**
- [Simulation: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184560269459-Simulation-MLM2PRO)
- [Projection](https://rapsodo.zendesk.com/hc/en-us/articles/44184859577491-Projection-MLM2PRO)`
      },
      {
        id: "graphics-performance",
        icon: Settings,
        title: "Graphics & Performance",
        description: "Optimize LOD settings for smooth play",
        hasVideo: false,
        content: `Level of Detail (LOD) testing automatically sets graphics quality for your device. Adjust if you experience lag or want better visuals.

**LOD levels:**
- **Low:** Best performance, lower graphics
- **Medium:** Balanced performance and quality
- **High:** Better graphics, requires newer devices
- **Max:** Highest quality, flagship devices only

**Performance issues?**
- Close background apps
- Ensure strong Wi-Fi connection
- Lower LOD graphics setting
- Update app and firmware
- Restart device

**How to adjust:**
Run LOD assessment in app settings to re-test and adjust graphics level for optimal performance.

**References:**
- [LOD (Level of Detail)](https://rapsodo.zendesk.com/hc/en-us/articles/44184742136083-LOD-Level-of-Detail-MLM2PRO)`
      }
    ]
  },
  {
    id: "advanced-features",
    title: "Advanced Features",
    subtitle: "Partner integrations and speed training",
    topics: [
      {
        id: "integrations",
        icon: Zap,
        title: "Partner Integrations",
        description: "GSPro, E6, Awesome Golf, The Stack",
        hasVideo: true,
        content: `Connect to 3rd-party simulation and training platforms. Authenticate from the MLM2PRO app, then follow partner app instructions.

**Watch: Connecting Awesome Golf**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube-nocookie.com/embed/FiJ3Wc4x5So?rel=0&modestbranding=1&playsinline=1"
    title="Connecting Awesome Golf"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

**GSPro (PC simulation):**
1. Update MLM2PRO firmware and app
2. Authenticate under 3rd Party Apps in MLM2PRO
3. Select MLM2PRO inside GSPro on your PC
4. Start playing

**E6 Connect (iOS only):**
1. Authenticate in MLM2PRO app
2. Enter your E6 product key (provided after registration)
3. Start session in E6 app

**Awesome Golf:**
- Follow in-app authentication flow
- See setup guides and video tutorials below

**The Stack (speed training):**
1. Validate Premium membership in Rapsodo app
2. Update firmware to 3.8.47+
3. Set MLM2PRO as Speed Device in The Stack app

**References:**
- [Integrations: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184698948499-Integrations-MLM2PRO)
- [Awesome Golf Setup](https://awesome-golf.com/rapsodo/)
- [Awesome Golf Video](https://youtu.be/adjBnyI2BBg)`
      },
      {
        id: "speed-training",
        icon: Zap,
        title: "R-Speed Training",
        description: "Track swing speed without hitting balls",
        hasVideo: false,
        content: `Track club speed without hitting a ball. Perfect for speed training systems or monitoring swing velocity improvements.

**How to use:**
1. Go to Play > Speed in app
2. Select your training system or standard club
3. Swing and track maximum velocity
4. Review sessions in app or R-Cloud

**What's tracked:**
- Maximum swing velocity per swing
- Session history and trends
- Progress over time

**View results:**
- Filter by Speed on Home tab
- Full analysis in R-Cloud web portal
- Compare sessions to track improvement

**References:**
- [R-Speed: Speed Training](https://rapsodo.zendesk.com/hc/en-us/articles/44183517920531-R-Speed-Speed-Training-MLM2PRO)`
      }
    ]
  },
  {
    id: "data-membership",
    title: "Data & Membership Management",
    subtitle: "Sync sessions, manage Premium, and access R-Cloud",
    topics: [
      {
        id: "data-sync",
        icon: Cloud,
        title: "Data Sync & R-Cloud",
        description: "Review sessions and manage your data",
        hasVideo: false,
        content: `Shots sync automatically when online. Always tap End Session after practice to ensure data is saved properly.

**Syncing process:**
- Auto-sync when connected to internet
- Offline data syncs when back online
- Must End Session for proper sync

**Forcing a sync:**
- Close and reopen the app
- Log out and log back in
- Keep app open a few minutes after ending session

**⚠️ Important warning:**
Never delete the MLM2PRO app with unsynced data. You will permanently lose all unsynced sessions.

**R-Cloud access:**
- Web portal for detailed session analysis
- View all historical data
- Premium membership required
- Export data for external analysis

**References:**
- [Syncing: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44203332221971-Syncing-MLM2PRO)
- [Membership (R-Cloud)](https://rapsodo.zendesk.com/hc/en-us/articles/44183693527955-Membership-MLM2PRO)`
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting & Quick Fixes",
    subtitle: "Common issues and solutions",
    topics: [
      {
        id: "firmware-issues",
        icon: AlertCircle,
        title: "Firmware Won't Update",
        description: "Hard reset and connection fixes",
        hasVideo: false,
        content: `Firmware update keeps failing? Try these steps in order.

**Solutions:**
1. **Reinstall the app** — Delete and reinstall MLM2PRO app
2. **Connect via Local Wi-Fi** — Profile > Connect > Local Network
3. **Check battery** — Must be 75%+ charged
4. **Keep plugged in** — Connect to power during entire update
5. **Hard reset** — Hold power button 20 seconds while plugged in
6. **Keep app open** — Don't minimize during update

**Still failing?**
Contact Rapsodo support with your device serial number and firmware version.

**References:**
- [Firmware: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184980737171-Firmware-MLM2PRO)
- [General Troubleshooting](https://rapsodo.zendesk.com/hc/en-us/articles/44378085420307-General-Troubleshooting-MLM2PRO)`
      },
      {
        id: "app-crashes",
        icon: AlertCircle,
        title: "App Crashes or Lags",
        description: "Performance and stability fixes",
        hasVideo: false,
        content: `App crashing or lagging during Courses or practice? Try these performance fixes.

**Quick fixes:**
1. **Update everything** — Update app and firmware to latest versions
2. **Close background apps** — Free up memory and processing power
3. **Check Wi-Fi** — Ensure stable, strong connection (Local Network mode)
4. **Lower graphics** — Reduce LOD detail level in settings
5. **Restart device** — Reboot both phone and MLM2PRO unit
6. **Reinstall app** — After syncing all data, delete and reinstall

**Platform-specific:**
- **Android:** Clear app cache in device settings
- **iOS:** Offload and reinstall app to preserve data

**Still crashing?**
Note what triggers the crash (specific course, practice mode, etc.) and contact support.

**References:**
- [General Troubleshooting](https://rapsodo.zendesk.com/hc/en-us/articles/44378085420307-General-Troubleshooting-MLM2PRO)
- [LOD Settings](https://rapsodo.zendesk.com/hc/en-us/articles/44184742136083-LOD-Level-of-Detail-MLM2PRO)`
      },
      {
        id: "wont-charge",
        icon: Battery,
        title: "Device Won't Charge or Turn On",
        description: "Power and battery troubleshooting",
        hasVideo: false,
        content: `Device won't turn on or charge? Follow these power troubleshooting steps.

**Try these in order:**
1. **Hard reset** — Hold power button 45–90 seconds while plugged in
2. **Use 15W adapter** — 5V/3A adapter works best (minimum 5V/2A)
3. **Try different cable** — Test with another USB-C cable
4. **Different outlet** — Try another wall outlet or power source
5. **Check for amber LED** — Amber light indicates charging is working

**LED indicator guide:**
- **Amber solid:** Charging in progress
- **Amber off:** Fully charged
- **No light:** Check cable, adapter, and outlet

**Still not working?**
Device may need service. Contact Rapsodo support for warranty assistance.

**References:**
- [Battery/Charging](https://rapsodo.zendesk.com/hc/en-us/articles/44182673173779-Battery-Charging-MLM2PRO)
- [LED Indicator](https://rapsodo.zendesk.com/hc/en-us/articles/44182728192915-LED-Indicator-MLM2PRO)`
      },
      {
        id: "connection-issues",
        icon: Wifi,
        title: "Can't Connect Device",
        description: "Bluetooth and Wi-Fi troubleshooting",
        hasVideo: false,
        content: `Having trouble connecting your device? Check these common issues.

**First, verify:**
- Using MLM2PRO app (not the old MLM app)
- Bluetooth is enabled on phone
- All app permissions granted
- No magnetic case on phone

**Try these fixes:**
1. **Toggle Quick Connect off** — Device Info > disable Quick Connect
2. **Restart both devices** — Power cycle phone and MLM2PRO
3. **Forget and reconnect** — Remove device, restart, reconnect
4. **Use Local Network mode** — Profile > Connect > Local Network
5. **Reinstall app** — Delete app, restart phone, reinstall

**Required permissions:**
- Bluetooth
- Wi-Fi
- Camera
- Microphone
- Location (for some Android devices)

**Still can't connect?**
Contact support with your device model and phone type.

**References:**
- [Connection: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183237516819-Connection-MLM2PRO)
- [General Troubleshooting](https://rapsodo.zendesk.com/hc/en-us/articles/44378085420307-General-Troubleshooting-MLM2PRO)`
      },
      {
        id: "sync-issues",
        icon: Cloud,
        title: "Sessions Won't Sync",
        description: "Data sync troubleshooting",
        hasVideo: false,
        content: `Sessions not syncing to R-Cloud? Follow these steps to force a sync.

**Important:**
Always tap End Session after practice. This triggers the sync process.

**Force sync methods:**
1. **Wait** — Keep app open 2–3 minutes after ending session
2. **Close/reopen app** — Force close and reopen MLM2PRO app
3. **Log out/in** — Sign out and sign back in to account
4. **Check internet** — Verify strong Wi-Fi or cellular connection

**⚠️ Critical warning:**
Never delete the app with unsynced data. You will lose all unsynced sessions permanently.

**How to check sync status:**
- Look for cloud icon status in session history
- Unsynced sessions show pending indicator
- Check R-Cloud web portal for latest sessions

**Still not syncing?**
Contact support with session date/time that won't sync.

**References:**
- [Syncing: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44203332221971-Syncing-MLM2PRO)`
      }
    ]
  }
];

const CARD_ICONS = {
  Battery,
  Wifi,
  Settings,
  Target,
  Play,
  Zap,
  Cloud,
  AlertCircle,
};

export const TroubleshootingHub = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
  const [expandedSection, setExpandedSection] = React.useState<string | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  // Track section view with Intersection Observer
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !hasTrackedView.current) {
            hasTrackedView.current = true;
            trackSectionView('troubleshooting-hub', 'Troubleshooting Hub');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const filteredSections = React.useMemo(() => {
    if (!searchQuery) return SECTIONS;

    const query = searchQuery.toLowerCase();
    return SECTIONS.map(section => ({
      ...section,
      topics: section.topics.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.content.toLowerCase().includes(query)
      )
    })).filter(section => section.topics.length > 0);
  }, [searchQuery]);

  // Track search queries with debouncing
  const totalResults = filteredSections.reduce((acc, section) => acc + section.topics.length, 0);
  useSearchTracking(searchQuery, totalResults);

  // Track accordion section expansion
  const handleAccordionChange = (value: string | undefined) => {
    setExpandedSection(value);
    if (value) {
      const section = SECTIONS.find(s => s.id === value);
      if (section) {
        trackSectionExpanded(section.id, section.title);
      }
    }
  };

  // Track topic expansion
  const handleTopicClick = (topicId: string, topicTitle: string, sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isExpanding = selectedTopic !== topicId;
    setSelectedTopic(isExpanding ? topicId : null);
    if (isExpanding) {
      trackTopicExpanded(topicId, topicTitle, sectionId);
    }
  };

  // Track external link clicks in markdown content
  const handleContentClick = (e: React.MouseEvent, sectionId: string) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const link = target as HTMLAnchorElement;
      const href = link.getAttribute('href');
      if (href && href.startsWith('http')) {
        trackExternalLink(href, link.textContent || '', sectionId);
      }
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-genericblack py-20 px-4 md:px-8" id="troubleshooting">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)] mb-4">Get Started Fast with the MLM2PRO Starter Guide</h2>
          <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] opacity-80 mb-8">Get Off The Tee Quick! Click or search topics, available videos are provided. </p>

          <div className="max-w-2xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Search topics or select from the categories below"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 px-6 text-lg bg-white border-2 border-white focus:border-primary600-main"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4" value={expandedSection} onValueChange={handleAccordionChange}>
            {filteredSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="bg-white rounded-xl border-2 border-white overflow-hidden data-[state=open]:border-primary600-main transition-colors scroll-mt-24"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50">
                  <div className="flex flex-col items-start text-left w-full pr-4">
                    <span className="font-heading-28-3xl-hero font-[number:var(--heading-28-3xl-hero-font-weight)] text-[length:var(--heading-28-3xl-hero-font-size)] tracking-[var(--heading-28-3xl-hero-letter-spacing)] leading-[var(--heading-28-3xl-hero-line-height)] text-genericblack mb-1">
                      {section.title}
                    </span>
                    <span className="font-paragraph-14-sm-medium text-gray-600">
                      {section.subtitle}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.topics.map((topic) => {
                      const Icon = topic.icon;
                      const isExpanded = selectedTopic === topic.id;
                      
                      return (
                        <div key={topic.id} className={`
                          ${isExpanded ? 'md:col-span-2' : ''}
                          transition-all duration-200
                        `}>
                          <div
                            onClick={(e) => handleTopicClick(topic.id, topic.title, section.id, e)}
                            className={`
                              bg-gray-50 rounded-lg p-5 cursor-pointer
                              border-2 transition-all hover:shadow-md
                              ${isExpanded ? 'border-primary600-main bg-white' : 'border-transparent hover:border-gray-200'}
                            `}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-primary600-main/10 flex items-center justify-center">
                                  <Icon className="w-6 h-6 text-primary600-main" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h4 className="font-heading-20-xl-hero font-semibold text-genericblack">
                                    {topic.title}
                                  </h4>
                                  {topic.hasVideo && (
                                    <span className="flex-shrink-0 px-2 py-1 bg-primary600-main text-white text-xs font-semibold rounded">
                                      VIDEO
                                    </span>
                                  )}
                                </div>
                                <p className="font-paragraph-14-sm-medium text-gray-600 mb-3">
                                  {topic.description}
                                </p>
                                <button className="font-paragraph-14-sm-semibold text-primary600-main hover:underline">
                                  {isExpanded ? 'Show less' : 'Learn more →'}
                                </button>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="mt-6 pt-6 border-t border-gray-200" onClick={(e) => handleContentClick(e, section.id)}>
                                <div className="prose prose-sm max-w-none
                                  prose-headings:font-heading-20-xl-hero prose-headings:text-genericblack prose-headings:mb-3
                                  prose-p:font-paragraph-16-base-medium prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                                  prose-strong:text-genericblack prose-strong:font-semibold
                                  prose-a:text-primary600-main prose-a:no-underline hover:prose-a:underline
                                  prose-ul:font-paragraph-16-base-medium prose-ul:text-gray-700 prose-ul:space-y-1
                                  prose-li:my-1 prose-li:leading-relaxed
                                ">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                  >
                                    {topic.content}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
