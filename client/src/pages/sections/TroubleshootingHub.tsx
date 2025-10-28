import React from "react";
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

interface TroubleshootingSection {
  id: string;
  title: string;
  category: string;
  content: string;
}

const SECTIONS: TroubleshootingSection[] = [
  {
    id: "what-you-bought",
    title: "Start Here: What you bought + what's included",
    category: "Getting Started",
    content: `Meet your Rapsodo MLM2PRO — a dual‑camera + radar launch monitor that tracks ball flight and select club data, works indoors and outdoors, and unlocks simulation, combines, and training experiences via the mobile app.

**Top questions:**
- **What can MLM2PRO do?** It provides 15 metrics (6 measured), dual camera views (Swing/Impact Vision), and access to Rapsodo Range, Courses, Combines, and more.
- **What's in the box?** MLM2PRO unit, tripod, charging cable, quick start guide, and a sleeve of RPT golf balls.
- **Do I need special balls?** Regular balls work for core metrics. For measured spin rate and spin axis, use Rapsodo RPT balls.

**References:**
- [Metrics/Features: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183787338515-Metrics-Features-MLM2PRO)
- [RPT Balls/Tripod/Cases](https://rapsodo.zendesk.com/hc/en-us/articles/44182907552403-RPT-Balls-Tripod-Cases-MLM2PRO)`
  },
  {
    id: "charge-device",
    title: "Charge and Device Lights",
    category: "Getting Started",
    content: `Fully charge your device before first use with a 5V/2A–3A (15W) adapter. Use the LED indicators to understand status during charging and use.

**Top questions:**
- **How long to charge and how long does it last?** About 1 hour to charge; roughly 4 hours of use per charge.
- **How do I know it's charged?** Amber LED turns off when full; battery % shows in Device Info after pairing.
- **What do the LEDs mean?** Red = on/not connected; flashing blue = connecting; blue = connected/processing; green = ball detected; flashing red = low battery; amber = charging; flashing white = firmware updating.

**Checklist:**
- Use a 5V/3A (15W) adapter when possible (minimum 5V/2A)
- Charge to at least 75% before firmware updates
- Verify amber LED turns off once fully charged

**References:**
- [Battery/Charging: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44182673173779-Battery-Charging-MLM2PRO)
- [LED Indicator: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44182728192915-LED-Indicator-MLM2PRO)`
  },
  {
    id: "create-account",
    title: "Create Account and Claim Membership",
    category: "Getting Started",
    content: `Sign in to the MLM2PRO app and activate your included Premium membership trial through R‑Cloud to unlock simulation, spin metrics with RPT balls, R‑Speed, and more.

**Top questions:**
- **How do I activate the trial?** Log into R‑Cloud with your MLM2PRO account and select Start Trial under annual membership.
- **What's included in Premium?** Simulation access (Range/Courses/3rd‑party), measured spin/spin axis with RPT balls, R‑Speed, Insights, Combines, expanded storage, and more.
- **How do I cancel or manage billing?** Use R‑Cloud > Profile > Manage Membership. If you purchased via Apple/Google, manage it in your app store.
- **I see duplicate subscriptions — what now?** Email support with both account emails and order numbers; ensure you're not subscribed via both Apple and Rapsodo.

**References:**
- [Membership: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183693527955-Membership-MLM2PRO)
- [FAQ's: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44377947274899-FAQ-s-MLM2PRO)`
  },
  {
    id: "update-firmware",
    title: "Update Firmware (before first session)",
    category: "Getting Started",
    content: `Update firmware right away for best stability and features. Keep the device plugged in and the app open during updates.

**Watch the video tutorial:**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/sr6BEY5HmHc?si=4wcu1ylEWcrrbBuK" 
    title="Firmware Update Tutorial" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>
</div>

**Top questions:**
- **How do I update?** Connect in Direct mode with cellular to download; then enable Airplane Mode (leave Wi‑Fi/Bluetooth on) and install.
- **The update fails — what should I try?** Reinstall the app; connect via Local Wi‑Fi from Profile; ensure 75%+ battery; keep app open and device plugged in; if stuck, hold power 20 seconds to reset.

**Checklist:**
- Connect device and verify sufficient battery (75%+)
- Download firmware (Direct mode with cellular)
- Switch to Airplane Mode (Wi‑Fi/Bluetooth on) and install
- Keep app open and device plugged in until complete

**References:**
- [Firmware: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184980737171-Firmware-MLM2PRO)
- [General Troubleshooting](https://rapsodo.zendesk.com/hc/en-us/articles/44378085420307-General-Troubleshooting-MLM2PRO)`
  },
  {
    id: "setup-space",
    title: "Set Up Your Space: Alignment, Leveling, Ball Placement",
    category: "Setup & Configuration",
    content: `Align the device to your target line, start sessions with the unit leveled on the tripod, and place the ball in the correct hitting zone shown on screen for the most accurate data.

**Top questions:**
- **How far from the ball?** Place MLM2PRO ~6.5–8 ft behind the ball; for Club Data, place the ball ~7.5 ft from the unit inside the orange hitting zone.
- **How do I level and align?** Use on‑screen alignment line and leveling feedback; ensure a stable, flat surface before starting a session.
- **Do left‑ or right‑handed settings matter?** Yes — set dexterity in Profile > App Settings before starting.

**Checklist:**
- Align device to target line using the on‑screen center line
- Level device on tripod before starting session
- Position ball in correct hitting zone (orange for Club Data)
- Confirm dexterity in App Settings

**References:**
- [Aligning/Level for Club Data](https://rapsodo.zendesk.com/hc/en-us/articles/43994468301459-Aligning-and-Level-Your-Rapsodo-MLM2PRO-for-NEW-Club-Data)
- [FAQ's](https://rapsodo.zendesk.com/hc/en-us/articles/44377947274899-FAQ-s-MLM2PRO)`
  },
  {
    id: "connect-device",
    title: "Connect the Device: Direct vs Local Network + Quick Connect",
    category: "Setup & Configuration",
    content: `Use Quick Connect to auto‑reconnect. Choose Direct Wi‑Fi for ranges/weak Wi‑Fi; choose Local Network for home setups, firmware updates, and 3rd‑party apps.

**Watch the Device Info tutorial:**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/qMtR1Nx96NY?si=LwfAQz-phvVLc4Qo" 
    title="Device Info Page Tutorial" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>
</div>

**Top questions:**
- **How do I connect the first time?** Power on, open the app, go to Profile > Connect MLM2PRO, then choose Direct Wi‑Fi or Local Network and follow prompts.
- **What is Quick Connect?** A setting that remembers your preferred connection type and speeds up future connections.
- **I can't connect — what do I check?** Use the MLM2PRO app (not MLM), enable Bluetooth and required permissions, remove magnetic cases, try toggling off Quick Connect or reinstalling the app.

**Platform callouts:**
- **Android:** Use Local Network mode for Rapsodo Courses access.
- **iOS:** Use Local Network mode or Direct mode with active cellular internet.

**Checklist:**
- Turn on device and open the MLM2PRO app
- Profile > Connect MLM2PRO > choose connection type
- Enable Quick Connect in Device Info (optional)
- Verify permissions (Bluetooth, Wi‑Fi, Camera, Microphone, Location)

**References:**
- [Connection: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183237516819-Connection-MLM2PRO)`
  },
  {
    id: "configure-app",
    title: "Configure the App: My Bag, Elevation, Ball Type",
    category: "Setup & Configuration",
    content: `Configure My Bag for quick club switching, set elevation per location, and choose your ball type at session start for best accuracy.

**Top questions:**
- **How do I set up My Bag?** Add clubs ahead of time. You can move a club to Inventory, but at least one club must always remain in My Bag.
- **How do I set elevation?** At session start, set elevation based on your location to improve data accuracy.
- **Which ball type should I pick?** Select the RPT ball option when using RPT balls to enable measured spin/spin axis.

**Checklist:**
- Add clubs in My Bag before your first session
- Set elevation when starting a session
- Select ball type (RPT vs premium/range ball)

**References:**
- [My Bag: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44185021439507-My-Bag-MLM2PRO)
- [Elevation: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44183851507603-Elevation-MLM2PRO)
- [Spin Information](https://rapsodo.zendesk.com/hc/en-us/articles/44182520056211-Spin-Information-MLM2PRO)`
  },
  {
    id: "first-shots",
    title: "First Shots: Practice basics and measured metrics",
    category: "Using Your Device",
    content: `Start a Practice session to see real‑time ball flight, video replay, and metrics. RPT balls enable measured spin and spin axis.

**Top questions:**
- **Which metrics are measured vs calculated?** Club speed, ball speed, launch angle, launch direction, spin rate, and spin axis are measured (with RPT balls for spin). Others are derived.
- **Will I get spin indoors/outdoors?** Measured spin requires RPT balls. Indoors into a net is common; outdoors without RPT balls won't show measured spin.
- **My indoor carry looks short — why?** "Indoor swing syndrome" is common; speed and carry improve with continued net use. Compare like‑for‑like clubs and sessions.

**Checklist:**
- Verify space: device 6.5–8 ft behind ball; ~8 ft ball flight to net/screen
- Use RPT balls for measured spin/spin axis
- Start Practice and confirm video/metrics are recording

**References:**
- [Metrics/Features](https://rapsodo.zendesk.com/hc/en-us/articles/44183787338515-Metrics-Features-MLM2PRO)
- [Spin Information](https://rapsodo.zendesk.com/hc/en-us/articles/44182520056211-Spin-Information-MLM2PRO)
- [Inaccuracies (indoor swing syndrome)](https://rapsodo.zendesk.com/hc/en-us/articles/44185264868755-Inaccuracies-MLM2PRO)`
  },
  {
    id: "simulation",
    title: "Simulation Essentials (Rapsodo Range/Courses)",
    category: "Using Your Device",
    content: `Play 30K+ courses and practice ranges on mobile. You can project or mirror to a bigger screen and tune graphics (LOD) for your device.

**Watch the Rapsodo Range tutorial:**

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/eZrs2dG--is?si=76sUQBp3Lf2F0QJy" 
    title="Rapsodo Range Tutorial" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>
</div>

**Top questions:**
- **How do I start a session?** Connect the device, then choose Range or Courses from Play.
- **Can I use a projector or TV?** Yes — HDMI adapter (Lightning/USB‑C) or screen mirroring works.
- **Is there multiplayer?** Yes, up to 4 additional players on Courses; only Player 1's data is saved.
- **Why does performance vary by device?** LOD testing sets graphics level (Low/Medium/High/Max) per device to ensure smooth play.

**Platform callouts:**
- **Android:** Connect in Local Network mode to access Courses.
- **iOS:** Courses work via Local Network; Direct mode requires active cellular internet to load a course.

**Checklist:**
- Connect device and verify strong Wi‑Fi (Local Network recommended)
- Start Range or Courses from the Play tab
- Optionally project via HDMI adapter or use screen mirroring
- If performance lags, reduce graphics via LOD assessment

**References:**
- [Simulation: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184560269459-Simulation-MLM2PRO)
- [Projection](https://rapsodo.zendesk.com/hc/en-us/articles/44184859577491-Projection-MLM2PRO)
- [LOD (graphics)](https://rapsodo.zendesk.com/hc/en-us/articles/44184742136083-LOD-Level-of-Detail-MLM2PRO)`
  },
  {
    id: "integrations",
    title: "Partner Integrations (E6, Awesome Golf, GSPro, The Stack)",
    category: "Using Your Device",
    content: `Authenticate partners from the MLM2PRO app, then follow partner app steps.

**Top questions:**
- **How do I use E6?** Authenticate in MLM2PRO (iOS only), then enter your E6 product key; start a session in E6.
- **How do I use Awesome Golf?** Follow the in‑app authentication flow; see linked setup guides.
- **How do I use GSPro?** Update firmware/app, authenticate in MLM2PRO under 3rd Party Apps, then select MLM2PRO inside GSPro on your PC.
- **Can I connect The Stack?** Yes — validate Premium in the Rapsodo app, update firmware (3.8.47+), set MLM2PRO as Speed Device in The Stack app.

**References:**
- [Integrations: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44184698948499-Integrations-MLM2PRO)
- [Awesome Golf (guide)](https://awesome-golf.com/rapsodo/)
- [Awesome Golf Assistant](https://awesome-golf.com/rapsodo/assistant/)
- [Awesome Golf video](https://youtu.be/adjBnyI2BBg)`
  },
  {
    id: "speed-training",
    title: "Speed Training (R‑Speed)",
    category: "Using Your Device",
    content: `Track club speed without hitting a ball. Choose your speed training system or a standard club and monitor progress in the app and R‑Cloud.

**Top questions:**
- **How do I start?** Play > Speed, select your training system or choose standard club.
- **What's measured?** Maximum swing velocity per swing.
- **Where do I find results?** Filter sessions by Speed on the Home tab or view in R‑Cloud.

**References:**
- [R‑Speed: Speed Training](https://rapsodo.zendesk.com/hc/en-us/articles/44183517920531-R-Speed-Speed-Training-MLM2PRO)`
  },
  {
    id: "sync-data",
    title: "Sync and Review Data (R‑Cloud)",
    category: "Data & Support",
    content: `Shots sync automatically when online; always tap End Session. Review sessions in the app or on R‑Cloud.

**Top questions:**
- **Do I need internet to sync?** Yes. If offline, data syncs when you're back online. Forcing a sync: close/reopen the app or log out/in.
- **Should I delete the app to fix issues?** No — deleting with unsynced data will permanently lose it.

**Checklist:**
- End Session at the end of each session
- Keep the app open for a few minutes to allow syncing
- Do not delete the app if there is unsynced data

**References:**
- [Syncing: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44203332221971-Syncing-MLM2PRO)
- [Membership (R‑Cloud access)](https://rapsodo.zendesk.com/hc/en-us/articles/44183693527955-Membership-MLM2PRO)`
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting and Accuracy Tips",
    category: "Data & Support",
    content: `If something feels off, check app/firmware versions, connection mode, battery/charging, and space/lighting. Review LED status and try basics first.

**Top questions:**
- **Firmware update keeps failing — now what?** Reinstall app; connect via Local Wi‑Fi; keep device plugged in with 75%+ battery; hard‑reset by holding power.
- **App crashes or lags in Courses — what helps?** Update app/firmware, close background apps, ensure stable Wi‑Fi, lower graphics detail (LOD), reinstall after syncing.
- **Sessions won't sync — what should I do?** Always End Session; leave app open a few minutes; don't delete with unsynced data; log out/in if needed.
- **Device won't turn on/charge — what to try?** Hold power 45–90 seconds while plugged in; use 15W adapter (5V/3A); try other cables/outlets; amber LED indicates charging.
- **Readings feel low indoors — is that normal?** Indoor swing speeds can be lower at first; continue practicing and compare like‑for‑like sessions/clubs.

**Quick checks:**
- Update app and firmware; ensure strong Wi‑Fi/local network
- Verify device battery and charging setup
- Reboot device/app; reduce LOD graphics if lagging

**References:**
- [General Troubleshooting](https://rapsodo.zendesk.com/hc/en-us/articles/44378085420307-General-Troubleshooting-MLM2PRO)
- [Inaccuracies](https://rapsodo.zendesk.com/hc/en-us/articles/44185264868755-Inaccuracies-MLM2PRO)
- [LED Indicator](https://rapsodo.zendesk.com/hc/en-us/articles/44182728192915-LED-Indicator-MLM2PRO)
- [Battery/Charging](https://rapsodo.zendesk.com/hc/en-us/articles/44182673173779-Battery-Charging-MLM2PRO)`
  },
  {
    id: "international",
    title: "International Notes (availability/shipping/support)",
    category: "Data & Support",
    content: `Availability of accessories may vary by region. If you need help with RPT balls or local purchasing, contact the regional support listed below.

**Top questions:**
- **Can I buy RPT balls outside the US?** Availability is limited — contact international support for options.
- **Do you ship to Quebec?** Rapsodo.com doesn't ship to Quebec; purchase through GolfTown.
- **Is the Japanese MLM2 different?** No — hardware is the same; use the Japan support channel for assistance.

**References:**
- [International: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44378947094035-International-MLM2PRO)`
  },
  {
    id: "faq",
    title: "Quick FAQ Recap",
    category: "Data & Support",
    content: `Common fast answers for new users.

**Top questions:**
- **How much space do I need?** Place device 6.5–8 ft behind the ball, with at least ~8 ft of ball flight to your net/screen.
- **Can left‑ and right‑handed players share one setup?** Yes — just switch dexterity in Profile > Settings.
- **Does MLM2PRO work with a PC?** The app runs on iOS/Android; PC use is via partner simulation software like GSPro.
- **E6 availability?** E6 is available on iOS only; you receive a product key after registration.

**References:**
- [FAQ's: MLM2PRO](https://rapsodo.zendesk.com/hc/en-us/articles/44377947274899-FAQ-s-MLM2PRO)
- [Metrics/Features](https://rapsodo.zendesk.com/hc/en-us/articles/44183787338515-Metrics-Features-MLM2PRO)
- [Simulation](https://rapsodo.zendesk.com/hc/en-us/articles/44184560269459-Simulation-MLM2PRO)`
  },
];

const CATEGORIES = ["Getting Started", "Setup & Configuration", "Using Your Device", "Data & Support"];

export const TroubleshootingHub = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredSections = React.useMemo(() => {
    let filtered = SECTIONS;

    if (selectedCategory) {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) || 
        s.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <section className="w-full bg-genericblack py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)] mb-4">
            HELP CENTER
          </h2>
          <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] opacity-80 mb-8">
            Everything you need to get the most out of your MLM2PRO
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 px-6 text-lg bg-white border-2 border-white focus:border-primary600-main"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-paragraph-14-sm-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-primary600-main text-white'
                  : 'bg-white text-genericblack hover:bg-primary600-main hover:text-white'
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-paragraph-14-sm-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary600-main text-white'
                    : 'bg-white text-genericblack hover:bg-primary600-main hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredSections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="bg-white rounded-xl border-2 border-white overflow-hidden data-[state=open]:border-primary600-main transition-colors"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <div className="flex flex-col items-start text-left w-full pr-4">
                    <span className="font-paragraph-12-xs-semibold text-primary600-main uppercase mb-1">
                      {section.category}
                    </span>
                    <span className="font-heading-28-3xl-hero font-[number:var(--heading-28-3xl-hero-font-weight)] text-[length:var(--heading-28-3xl-hero-font-size)] tracking-[var(--heading-28-3xl-hero-letter-spacing)] leading-[var(--heading-28-3xl-hero-line-height)] text-genericblack">
                      {section.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="prose prose-sm max-w-none
                    prose-headings:font-heading-28-3xl-hero prose-headings:text-genericblack
                    prose-p:font-paragraph-16-base-medium prose-p:text-genericblack prose-p:opacity-80
                    prose-strong:text-primary600-main prose-strong:font-semibold
                    prose-a:text-primary600-main prose-a:no-underline hover:prose-a:underline
                    prose-ul:font-paragraph-16-base-medium prose-ul:text-genericblack
                    prose-li:my-1
                  ">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <p className="font-paragraph-18-lg-medium text-genericwhite opacity-60">
                No results found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
