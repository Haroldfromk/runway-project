import type { SiteDictionary } from "./schema";

export const en: SiteDictionary = {
  nav: {
    concept: "Concept",
    screens: "Screens",
    architecture: "Architecture",
    privacy: "Privacy",
    support: "Support",
    maintenanceLog: "Maintenance Log",
    updates: "Updates",
  },
  hero: {
    badge: "A running app designed by an ex-aircraft mechanic",
    titleLine1: "Turn Every",
    titleLine2Prefix: "Run Into A",
    titleLine2Accent: "Flight.",
    description: [
      "An iOS running tracker built by a developer who used to maintain A320F aircraft.",
      "Read your GPS, heart rate, and cadence like a flight instrument, and get pace deviations as GPWS-style warnings.",
    ],
    appStoreCta: "Download on the App Store",
    badgeOs: "iOS 26+ · watchOS 11.5+",
    badgeStack: "SwiftUI · Actor · AsyncStream",
  },
  concept: {
    eyebrow: "Flight Operations",
    title: "Two Flight Modes",
    description: [
      "A state machine modeled after aircraft operating procedures runs the entire session.",
      "Press start for a takeoff sequence, then a live instrument panel takes over for the run.",
    ],
    modes: [
      {
        tag: "MODE A",
        title: "Mission Flight",
        desc: "Set a target pace and distance, then fly the mission. GPWS warns you the moment you drift outside the allowed deviation.",
        points: [
          "Target pace ± deviation setting",
          "Quick distance presets (3K / 5K / 10K / Half / Full)",
          "MINIMUMS alert 50m before the target distance",
        ],
      },
      {
        tag: "MODE B",
        title: "Free Flight",
        desc: "A VFR-style mode for running without a fixed goal. End the session manually with Touchdown.",
        points: ["No target set", "GPWS disabled", "Free-form pace logging"],
      },
    ],
    gpwsEyebrow: "Ground Proximity Warning System",
    gpwsAlerts: [
      { label: "SINK RATE", desc: "Slower than target pace" },
      { label: "OVERSPEED", desc: "Faster than target pace" },
      { label: "MINIMUMS", desc: "50m before target distance" },
    ],
  },
  screens: {
    eyebrow: "iPhone & Apple Watch",
    title: "Two Screens, One Flight",
    description: [
      "Whether the Watch or the iPhone leads, both devices share the same FlightData.",
      "Take a look at every real screen, from pre-flight checks to the post-landing log.",
    ],
    phoneLabel: "iPhone · scroll sideways",
    watchLabel: "Apple Watch",
    phoneShots: [
      { key: "homeview", label: "HOME · Dashboard" },
      { key: "missionflight", label: "MISSION FLIGHT · Setup" },
      { key: "takeoff", label: "TAKEOFF · Pre-flight check" },
      { key: "missionrunning", label: "MISSION FLIGHT · CRUISE" },
      { key: "freerunning", label: "FREE FLIGHT · CRUISE" },
      { key: "touchdown", label: "TOUCHDOWN" },
      { key: "summary", label: "FLIGHT SUMMARY · Map route" },
      { key: "debrief", label: "DEBRIEF · Run Analysis" },
      { key: "fdr", label: "FLIGHT DATA RECORDER" },
      { key: "fdr-drag", label: "FLIGHT DATA RECORDER · Rewind" },
      { key: "logbook", label: "LOGBOOK" },
      { key: "databackup", label: "DATA BACKUP · CloudKit" },
      { key: "alerts", label: "ALERTS · GPWS history" },
      { key: "chart", label: "FLIGHT CALENDAR" },
      { key: "notification", label: "TOWER REMINDERS · Reminder" },
      { key: "dynamic-island", label: "DYNAMIC ISLAND" },
    ],
    watchShots: [
      { key: "home", label: "WATCH · Mode select" },
      { key: "running", label: "WATCH · PFD" },
      { key: "summary", label: "WATCH · Summary" },
    ],
  },
  architecture: {
    eyebrow: "Under The Hood",
    title: "Four Design Decisions",
    description: [
      "Concurrency, state management, cross-device sync, and GPWS logic - the",
      "four areas I thought hardest about while building RunWay.",
    ],
    quoteLabel: "Why it's designed this way",
    tabs: [
      { id: "actor", label: "RunningCenter Actor", eyebrow: "Concurrency" },
      { id: "phase", label: "FlightPhase State Machine", eyebrow: "State management" },
      { id: "mirroring", label: "Watch Mirroring", eyebrow: "Cross-device sync" },
      { id: "gpws", label: "GPWS Threshold Logic", eyebrow: "Pace deviation" },
    ],
    actor: {
      quote:
        "GPS updates arrive continuously and require recalculating pace, distance, and GPWS status each time, so I isolated that calculation logic inside a RunningCenter Actor to guarantee state integrity. Heart rate and cadence come in through WatchConnectivity into a HealthCenter Actor that just holds the values thread-safely with no judgment logic of its own, and RunningCenter pulls from it whenever it needs those values for the @Observable ViewModel.",
    },
    phase: {
      quote: [
        "When every screen decides its own state independently, screens drift out of sync with each other.",
        "I introduced a single FlightPhase, modeled after aircraft flight phases, that the whole app references - so Dynamic Island, Watch, and iPhone PFD always show the same state.",
      ],
    },
    mirroring: {
      leadingLabel: "GPS + calculation",
      followingLabel: "Receive + display only",
      payloadLabel: "FlightData (pace/distance/coords, 3s throttle) + elapsedTime (separate 1s sync)",
      quote: [
        "At first, both the iPhone and the Watch were tracking GPS on their own even while mirroring.",
        "Switching to a structure where only the leading device (startOrigin) tracks location and sends the computed results to the other eliminated the duplicate computation and the lag when switching screens.",
      ],
    },
    gpws: {
      overspeedLabel: "OVERSPEED - faster than target",
      normalLabel: "Within tolerance",
      sinkRateLabel: "SINK RATE - slower than target",
      minimumsLabel: "MINIMUMS - last 50m before target",
      quote:
        "GPWS has to react the instant pace drifts outside the target ± tolerance, so every location update recalculates the current pace to check for SINK RATE or OVERSPEED. Inside the last 50m before the target distance, MINIMUMS takes priority over pace, so the 'almost there' signal never gets missed.",
    },
    stack: [
      { label: "SwiftUI", role: "UI" },
      { label: "@MainActor + @Observable", role: "State management" },
      { label: "RunningCenter (Actor)", role: "Concurrency" },
      { label: "HealthCenter (Actor)", role: "Thread-safe heart rate/cadence storage" },
      { label: "AsyncStream", role: "Sensors → ViewModel" },
      { label: "FlightPhase enum", role: "State machine" },
      { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
      { label: "SwiftData", role: "Storage" },
      { label: "CloudKit (CKRecord)", role: "Manual backup/restore · Private Database" },
      { label: "Douglas-Peucker", role: "GPS route compression, tolerance scaled to route diagonal" },
      { label: "MapKit + MapPolyline", role: "Route visualization" },
      { label: "HealthKit", role: "Heart rate, cadence, workout session" },
      { label: "WidgetKit + ActivityKit", role: "Dynamic Island" },
      { label: "WeatherKit", role: "Live weather" },
      { label: "AVSpeechSynthesizer", role: "Voice announcements for km splits and countdown" },
      { label: "Combine", role: "Location, alert, session-state publishers + timer" },
    ],
  },
  architecturePage: {
    backLabel: "Back to RunWay",
    mapEyebrow: "System Flow",
    mapTitle: "Full Systems Map",
    mapDescription: [
      "From GPS, heart rate and altitude sensors through the screens, storage, and",
      "iPhone-Watch sync, all 17 components that make up the app on one map.",
    ],
    mapHint: "Click a box to see its real code on the right",
    bands: ["01 · Sensor Input", "02 · Core Compute (actor)", "03 · ViewModel · Cross-Device Sync", "04 · Live Screens", "05 · Persistence", "06 · History"],
    intentLabel: "Why It's Built This Way",
    respLabel: "Responsibilities",
  },
  systemsMapNodes: [
    {
      id: "loc",
      name: "LocationService",
      path: "RunWay/Shared/Service/LocationService.swift",
      desc: "Wraps CLLocationManager and publishes location updates. Only samples within 10s and 50m horizontal accuracy pass through.",
      resp: [
        "Wraps CLLocationManager, publishes location updates as a Combine publisher",
        "Filters to samples within 10s and 50m horizontal accuracy",
        "Handles authorization status changes (requests, restricted/denied alerts)",
        "Starts/stops tracking with no distanceFilter, so location keeps arriving while stationary",
      ],
    },
    {
      id: "health",
      name: "HealthCenter",
      path: "RunWay/Shared/Actor/HealthCenter.swift",
      desc: "Holds incoming heart rate/cadence thread-safely in the background. No judgement logic — RunningCenter reads the value when it needs it.",
      resp: [
        "Holds heart rate and cadence thread-safely as an actor",
        "No judgement logic of its own — RunningCenter reads the value when needed",
      ],
    },
    {
      id: "alt",
      name: "AltimeterService",
      path: "RunWay/Shared/Service/AltimeterService.swift",
      desc: "Collects barometer-based relative altitude via CMAltimeter. Devices without a barometer publish nothing.",
      resp: [
        "Wraps CMAltimeter, publishes relative altitude updates",
        "Publishes nothing on devices without a barometer",
        "Fires the permission prompt early during onboarding, then stops immediately",
      ],
    },
    {
      id: "core",
      name: "RunningCenter",
      path: "RunWay/Shared/Actor/RunningCenter.swift",
      desc: "The center of every running calculation. Takes GPS/heart rate/altitude in, computes distance, pace, GPWS, and splits, and streams out FlightData.",
      resp: [
        "Accumulates distance, smooths pace with a double exponential moving average",
        "Raw-speed-based stationary detection (isStationary), gated by speedAccuracy confidence",
        "GPWS (SINK RATE/OVERSPEED/MINIMUMS) judgement, reset to normal while stationary",
        "Records km splits, smooths and filters outliers in relative altitude",
      ],
      intent: "iOS and Watch each receive GPS, heart rate, and altitude independently, so RunningCenter also runs as a separate instance per device. Stationary detection confirms only after filtering out samples with low GPS confidence (speedAccuracy) — but at first that check only gated stationary detection, not the speed smoothing used for pace. The moment you slow down hard in response to OVERSPEED is exactly when GPS confidence tends to go negative, so stationary detection never confirmed while the smoothed speed kept getting pulled toward zero, inflating pace until the app crashed. Fixed in 1.3.1 by moving the smoothing update inside the same confidence check.",
    },
    {
      id: "runvm",
      name: "RunViewModel",
      path: "RunWay/ViewModels/RunViewModel.swift",
      desc: "The core ViewModel for the iPhone running screen. Coordinates LocationService, RunningCenter, HealthKitService, and WatchConnectivityService.",
      resp: [
        "Coordinates LocationService, RunningCenter, HealthKitService, and WatchConnectivityService",
        "Manages Live Activity, voice announcements (TTS), and WeatherKit weather data",
        "Saves to SwiftData and reschedules RunReminderService when a run ends",
        "Handles Watch mirroring start/stop and remote-stop signals",
      ],
    },
    {
      id: "watchvm",
      name: "WatchViewModel",
      path: "RunWayWatch Watch App/ViewModels/WatchViewModel.swift",
      desc: "The same structure as RunViewModel, adapted for Watch. startOrigin decides whether this device is driving or mirroring.",
      resp: [
        "Implements the same structure as RunViewModel, adapted for Watch",
        "Branches driving vs. mirroring device behavior based on startOrigin",
        "Handles saving directly for Watch-only runs",
      ],
    },
    {
      id: "wc",
      name: "WatchConnectivityService",
      path: "RunWay/Shared/Service/WatchConnectivityService.swift",
      desc: "The cross-device bridge wrapping WCSession. FlightData is throttled to 3s; isPaused is sent immediately.",
      resp: [
        "Wraps WCSession, sends/receives messages between iPhone and Watch",
        "Throttles FlightData to 3s; sends isPaused and elapsed time immediately",
        "Splits iOS-only and watchOS-only logic into separate extensions",
      ],
      intent: "Early on, both iPhone and Watch tracked GPS independently even while mirroring, so switching screens lagged while the driving device re-acquired a GPS lock. Restructuring around startOrigin so only the driving device tracks location and sends results to the other side eliminated both the duplicate computation and the lag.",
    },
    {
      id: "pfd",
      name: "PFDView",
      path: "RunWay/Views/Running/PFDView.swift",
      desc: "The live instrument panel during a run. Made up of SpeedTape, NavDisplay, Mission HUD, and the GPWS bar.",
      resp: [
        "Composes SpeedTape, NavDisplay, Mission HUD, and the GPWS bar",
        "Flashes the screen and triggers haptics on GPWS state changes",
        "Cleans up state in onDisappear even if the session is interrupted",
      ],
    },
    {
      id: "watchpfd",
      name: "WatchPFDView",
      path: "RunWayWatch Watch App/Views/WatchPFDView.swift",
      desc: "The Watch's live instrument panel. Decides whether to show the WatchGPWSView overlay based on gpwsStatus.",
      resp: [
        "Decides whether to show the WatchGPWSView overlay based on gpwsStatus",
        "Computes live deviation from the target (pace or heart rate)",
      ],
    },
    {
      id: "gpws",
      name: "WatchGPWSView",
      path: "RunWayWatch Watch App/Views/WatchGPWSView.swift",
      desc: "The SINK RATE/OVERSPEED warning overlay. Repeats a haptic pattern every 2 seconds while it's on screen.",
      resp: [
        "Renders the warning overlay per type (SINK RATE/OVERSPEED/MINIMUMS)",
        "Repeats a distinct haptic pattern per warning type every 2 seconds",
        "Cancels the haptic task immediately on onDisappear",
      ],
      intent: "Since you're often not looking at the screen while running, each warning type needed to feel different by touch alone — SINK RATE is two unhurried upward taps, OVERSPEED is four quick downward ones. The original approach of 'freezing' GPWS while stationary meant that if the state right before you stopped happened to be a warning, it stayed frozen and kept buzzing. Fixed in 1.3.1 by resetting to normal instead of freezing.",
    },
    {
      id: "sdmodels",
      name: "SwiftData Models",
      path: "RunWay/Models/SwiftData/*.swift",
      desc: "SwiftDataFlight (one run) cascades to Split (km segments), Alert (GPWS history), and Coordinate (route points).",
      resp: [
        "SwiftDataFlight: distance, time, pace, and heart rate summary for one run",
        "SwiftDataSplit: pace/heart rate/cadence/elevation per km segment",
        "SwiftDataAlert: when and what type of GPWS warning fired",
        "Deleting a Flight cascades to its related records",
      ],
      intent: "Adding CloudKit sync meant every non-optional property needed a declaration-site default value. SwiftData's lightweight migration fills in existing records based on those defaults, not init parameters, so every field got a default from the start to keep existing users' migrations safe as new fields get added later.",
    },
    {
      id: "cloud",
      name: "CloudBackupService",
      path: "RunWay/Shared/Service/CloudBackupService.swift",
      desc: "Builds a CKRecord by hand and uploads/downloads it, but only when the user taps the button.",
      resp: [
        "Builds a CKRecord by hand and uploads/downloads it, only when the user taps the button",
        "Encodes coordinates, alerts, and splits as JSON into a single field",
      ],
    },
    {
      id: "reminder",
      name: "RunReminderService",
      path: "RunWay/Services/RunReminderService.swift",
      desc: "Schedules a local notification for last-run-date + 7 days. Reschedules every time a run is saved.",
      resp: [
        "Schedules a local notification for last-run-date + 7 days",
        "Reschedules every time a new run is saved",
        "Can be turned on/off from a Settings toggle",
      ],
    },
    {
      id: "logbook",
      name: "LogbookView",
      path: "RunWay/Views/Running/LogbookView.swift",
      desc: "Groups SwiftDataFlight records by week, then by month, into a list.",
      resp: [
        "Groups SwiftDataFlight by week, then by month",
        "Provides a collapsible/expandable list UI per month/week",
      ],
    },
    {
      id: "summary",
      name: "FlightSummaryView",
      path: "RunWay/Views/Running/FlightSummaryView.swift",
      desc: "The detail screen for a single run. Shows the MapKit route, a km split chart, and GPWS badges.",
      resp: [
        "Renders the MapKit route from GPS coordinates",
        "Shows km splits as a Nike Run Club-style chart",
        "Shows the split-pattern badge and any GPWS warnings",
      ],
    },
    {
      id: "alerts",
      name: "AlertsView",
      path: "RunWay/Views/Alert/AlertsView.swift",
      desc: "Groups saved SwiftDataAlert records by month, showing SINK RATE/OVERSPEED/MINIMUMS history.",
      resp: [
        "Groups SwiftDataAlert by month to show history",
        "Distinguishes SINK RATE/OVERSPEED/MINIMUMS with separate icons",
      ],
    },
    {
      id: "calendar",
      name: "FlightCalendarView",
      path: "RunWay/Views/Chart/FlightCalendarView.swift",
      desc: "Shows monthly runs as a GitHub-style heatmap, with color intensity scaled to daily distance.",
      resp: [
        "Renders a heatmap where color opacity scales with daily distance",
        "Shows monthly total distance, run count, and average pace in a summary card",
      ],
    },
  ],
  footer: {
    tagline: "CLEARED FOR TAKE-OFF",
    description: [
      "A precision running solution built on a former aircraft mechanic's philosophy.",
      "Rotate, and start your flight.",
    ],
    githubLabel: "GitHub",
    blogLabel: "Blog",
    bottomLine: "RunWay - Turn Every Run Into A Flight",
  },
  troubleshootingPage: {
    backLabel: "Back to RunWay",
    eyebrow: "Maintenance Log",
    title: "Maintenance Log",
    description: [
      "Real problems I ran into during development, how I traced the root cause,",
      "and how I resolved them - written up in a maintenance-log format.",
      "Not everything got fixed, and structural limitations are labeled honestly as limitations.",
    ],
    resolvedLabel: "Resolved",
    limitationLabel: "Known Limitation",
    verdictLabel: "FINAL VERDICT",
    filterAllLabel: "All",
    filterEmpty: "No entries match this filter.",
  },
  supportPage: {
    backLabel: "Back to RunWay",
    eyebrow: "Support",
    title: "Support & Contact",
    description: [
      "Found a bug or have a feature suggestion? Let me know using the form below.",
      "You can also check the FAQ section further down first.",
    ],
    successTitle: "Your message has been sent",
    successBody: "I'll get back to you at the email address you provided.",
    categoryLabel: "Inquiry type",
    categories: [
      { id: "bug", label: "Bug report" },
      { id: "feature", label: "Feature request" },
      { id: "other", label: "Other" },
    ],
    nameLabel: "Name (optional)",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Please describe the situation and what went wrong in as much detail as you can.",
    notConfiguredMsg: "The contact form isn't configured yet. Please reach out via the email below instead.",
    submitErrorMsg: "Failed to send. Please try again in a moment.",
    submitting: "Sending...",
    submitLabel: "Send message",
    directEmailPrefix: "Prefer to email directly?",
    faqTitle: "Frequently Asked Questions",
    faqFooterPrefix: "For details on data handling, see the",
    faqFooterLinkLabel: "Privacy Policy",
    faqFooterSuffix: "page.",
    subjectNewInquiry: "New inquiry",
    subjectFromNameSuffix: "'s inquiry",
  },
  updatesPage: {
    backLabel: "Back to RunWay",
    eyebrow: "Updates",
    title: "Update history",
    description: [
      "What changed in each version, in order. This tracks what's",
      "actually shipped, so work that only exists in the next",
      "version isn't listed here yet, same as the maintenance log.",
    ],
    currentLabel: "Current version",
    releasedLabel: "Released",
  },
  faq: [
    {
      q: "Can I use just the iPhone or just the Apple Watch?",
      a: "Yes. iPhone alone, Apple Watch alone, and both together are all supported. A run started on the watch is handled entirely by the watch, and the record is sent to the iPhone's logbook once it ends. Starting from the iPhone wakes the watch app automatically; from there the iPhone handles GPS and calculations while the watch measures heart rate and shows the display.",
    },
    {
      q: "If one device shuts down or the app closes mid-run, do I lose the record?",
      a: "If the device tracking GPS shuts down, that run stops. When it ends normally, everything up to that point stays in the logbook. However, force-quitting the iPhone app during a run started on the iPhone can leave the watch display frozen on its last values, and that run may not reach the logbook. It is still saved to the Health app in that case. This is a known limitation we are working on.",
    },
    {
      q: "Where is my running data stored?",
      a: "By default every run is stored only on your device, through Apple's SwiftData. Tapping the backup button in Settings saves them to your own iCloud; this never happens automatically. Runs are also saved to Apple's Health app.",
    },
    {
      q: "If I delete the app, do my records go with it?",
      a: "Records stored on the device are deleted with it. If you backed up from Settings beforehand, you can reinstall, sign in with the same Apple Account, and tap restore to bring them back. Backup is not automatic, so it has to be tapped before deleting. Workouts saved to the Health app remain regardless.",
    },
    {
      q: "Is my location or heart rate data sent anywhere?",
      a: "There are no third-party analytics or advertising SDKs, and no third party including the developer can access your data. Only three things leave the device: your current location, sent to Apple's WeatherKit to show weather on the pre-flight screen; your records going to your own iCloud when you tap the backup button; and a once-a-day check for a newer version on the App Store. All three are handled by Apple and none is accessible to the developer. The update check sends only the app identifier and a country code, never your running data. The privacy policy page covers this in detail.",
    },
    {
      q: "GPWS alerts (SINK RATE, OVERSPEED) are firing when I do not expect them.",
      a: "Alerts are based on the target and tolerance you set in Mission Flight mode. The target can be either pace or heart rate, so check which one is selected along with the tolerance value. A narrower tolerance means more frequent alerts. If it still looks wrong, let us know through the form below.",
    },
    {
      q: "The app shows a LOST CONTACT alert after I ended my run on the watch.",
      a: "The app raises it when nothing has arrived from the Apple Watch for more than fifteen seconds. It usually means the run was ended on the watch but that signal never reached the app. Choosing to end the run keeps everything recorded up to that point, and choosing to keep running carries on as before. If watch data starts arriving again the alert clears by itself. It can also appear when the connection drops briefly mid-run, in which case you can dismiss it and keep going.",
    },
  ],
  troubleshooting: [
    {
      id: "mirroring-redesign",
      number: "01",
      title: "Redesigning the Mirroring Architecture",
      status: "RESOLVED",
      squawk: "Even in a Watch-led session, the iPhone tracked GPS on its own, causing a lag when switching screens",
      steps: [
        {
          tag: "FINDING",
          title: "Identifying the problem",
          body: "Even while mirroring, the iPhone and Watch were each running their own LocationService and RunningCenter independently. Starting from the Watch still caused a delay while the iPhone acquired its own GPS lock.",
        },
        {
          tag: "ACTION",
          title: "Changing direction",
          body: "Extended the existing startOrigin property to also govern whether a device tracks location. Only the leading device turns on GPS and sends the computed results to the other; the mirroring device just receives and displays.",
        },
        {
          tag: "DISCOVERY",
          title: "Implementing both directions",
          body: "sendFlightData() only existed on the iOS side, so data could only flow iPhone → Watch. In a Watch-led mirroring session, there was no path at all for the Watch's computed data to reach the iPhone - a hidden gap.",
        },
        {
          tag: "RESULT",
          title: "Closing the gap",
          body: "Bundling elapsedTime into the 3-second-throttled FlightData payload would let drift accumulate, so it's synced separately every 1 second via its own message (sendElapsedTime()). All four scenarios - iPhone-only, Watch-only, and bidirectional mirroring - now resolve to a single startOrigin-based flow.",
        },
      ],
    },
    {
      id: "nonisolated-crash",
      number: "02",
      title: "Real-Device Crash from a Missing nonisolated",
      status: "RESOLVED",
      squawk: "Worked fine in the simulator, crashed only on a real device",
      steps: [
        {
          tag: "FINDING",
          title: "Discovery",
          body: "Stack trace tracing pointed to a crash inside session(_:activationDidCompleteWith:error:).",
        },
        {
          tag: "ROOT CAUSE",
          title: "Root cause",
          body: "The class itself was declared nonisolated, but without marking the delegate methods inside the extension explicitly, Xcode 26's SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor default re-inferred them as @MainActor.",
        },
        {
          tag: "FINDING",
          title: "Recurrence",
          body: "Even after the first fix, the same crash pattern reappeared - only on real devices - inside didReceiveUserInfo.",
        },
        {
          tag: "ACTION",
          title: "Full audit",
          body: "Audited every WCSessionDelegate callback across both the +iOS and +watchOS extensions and added the missing nonisolated everywhere it was needed.",
        },
      ],
    },
    {
      id: "timer-restart",
      number: "03",
      title: "Timer Restart Issue",
      status: "RESOLVED",
      squawk: "After stopping, restarting wouldn't reset or resume elapsedTime",
      steps: [
        {
          tag: "APPROACH",
          title: "First implementation",
          body: "Used Timer.publish().connect() to control the start point directly, choosing it over autoconnect() with pause support in mind.",
        },
        {
          tag: "FINDING",
          title: "Restart failure",
          body: "The timer wouldn't run again after a restart. connect() is a one-time connection - once a Publisher is cancel()'d, it can't be reconnected.",
        },
        {
          tag: "ACTION",
          title: "Switching to autoconnect",
          body: "Switched to subscribing fresh with autoconnect() + sink every time start() is called, storing it in a Set<AnyCancellable> and clearing it with removeAll() on stop().",
        },
        {
          tag: "RESULT",
          title: "Preventing duplicate subscriptions",
          body: "Found that tapping start() repeatedly stacked up subscriptions, making seconds jump by 2 or 3 at once. Clearing any existing subscription right when start() runs fixed it for good.",
        },
      ],
    },
    {
      id: "asyncstream-continuation",
      number: "04",
      title: "Managing the AsyncStream continuation",
      status: "RESOLVED",
      squawk: "A new stream and a new Task were being created on every location update",
      steps: [
        {
          tag: "FINDING",
          title: "Discovery",
          body: "Instruments' Swift Concurrency profiler showed that a new AsyncStream and a new Task were being spun up on every single location update.",
        },
        {
          tag: "ACTION",
          title: "Promoting to a property",
          body: "Promoted the continuation to an Actor property. The stream is now opened only once, and processLocation() yields directly through the stored continuation.",
        },
        {
          tag: "FINDING",
          title: "Sendable conflict",
          body: "Setting continuation = nil directly inside onTermination threw 'Actor-isolated property can not be mutated from a Sendable closure' - the closure runs on an arbitrary thread, so it can't touch an Actor-protected property directly.",
        },
        {
          tag: "RESULT",
          title: "Splitting init from a task",
          body: "Created an Actor-isolated method (clearContinuation()) and wrapped it in Task { await ... }. Later split this out into startStream(), called from the View's .task, to clean up the flow further.",
        },
      ],
    },
    {
      id: "state-reset",
      number: "05",
      title: "State Not Resetting on Screen Exit",
      status: "RESOLVED",
      squawk: "Jumping to the tab bar abruptly meant resetState() never ran, leaving stale state for the next run",
      steps: [
        {
          tag: "FINDING",
          title: "Identifying the problem",
          body: "Only the normal flow (tapping a button) handled state cleanup - abnormal exits like tapping the tab bar or turning the Watch crown weren't covered at all, something I only caught through real-device testing.",
        },
        {
          tag: "FINDING",
          title: "Choosing the right signal",
          body: "Tried using an isRunning flag, but on the iPhone during mirroring, start() is never called, so the flag could read false even though a session was still alive. Switched the check to HealthKitService.shared.session != nil instead.",
        },
        {
          tag: "ACTION",
          title: "Flag pattern",
          body: "Button actions now set a flag like didNavigateToTouchdown to true first, and .onDisappear interprets the absence of that flag as an 'abnormal exit.' Applied the same pattern consistently across five Views.",
        },
        {
          tag: "RESULT",
          title: "Handling the exception",
          body: "FlightSummaryView is also reused for browsing the Logbook, so it's distinguished with a selectedFlight == nil condition. On Watch, only WatchSummaryView is set to always clean up unconditionally.",
        },
      ],
    },
    {
      id: "zombie-session",
      number: "06",
      title: "Zombie Session - Root Cause Found, Fix Deferred",
      status: "KNOWN LIMITATION",
      squawk: "Force-quitting during mirroring and relaunching leaves the old PFD state on screen",
      steps: [
        {
          tag: "FINDING",
          title: "First attempt",
          body: "Tried treating a session as a zombie if 5 seconds had passed since startDate, but couldn't verify it - force-quitting via the debugger immediately severed the connection, making it impossible to check the logs.",
        },
        {
          tag: "DISCOVERY",
          title: "Pinning down the cause",
          body: "Only after switching to os_log / Console.app and resolving a privacy-masking issue did the real cause come into focus: retrieveRemoteSession was re-detecting a session that was already alive on relaunch.",
        },
        {
          tag: "ACTION",
          title: "Flag-based detection",
          body: "A UserDefaults flag (wasZombieSuspected) detected the condition accurately, but calling .end() on it triggered a side effect - it cascaded into ending the Watch session too.",
        },
        {
          tag: "FINDING",
          title: "Exploring alternatives",
          body: "Tried comparing appLaunchTime instead. Ignoring a detected zombie blocked new mirroring sessions, while calling end() reintroduced the earlier side effect - a genuine dilemma.",
        },
        {
          tag: "RESULT",
          title: "Confirming the structural limit",
          body: "Concluded that HKWorkoutSession is a healthd (system daemon) level resource that app code simply can't fully control. Rolled back all related code and kept only the logging infrastructure.",
        },
      ],
      verdict:
        "Concluded that HKWorkoutSession is a healthd (system daemon) level resource that app code can't fully control. os_log/Console.app tracing pinpointed the exact cause, but with no fix possible without side effects, this was documented as a known limitation for v1.0.",
    },
    {
      id: "mirroring-race-condition",
      number: "07",
      title: "Watch-led mirroring race condition",
      status: "RESOLVED",
      squawk: "GPS never acquired in Watch-led runs only; a rebuild with no code changes flipped the symptom to the opposite device",
      steps: [
        {
          tag: "FINDING",
          title: "The symptom moved",
          body: "The issues seen in phone-led mirroring (Watch display not updating, stop not syncing) disappeared after a rebuild with zero code changes. In their place, Watch-led mirroring started showing a new symptom: location never acquired at all.",
        },
        {
          tag: "ROOT CAUSE",
          title: "Async assignment vs. sync check",
          body: "The startOrigin = .local assignment inside updatePhase(.cruise) sits inside a Task {}, making it async. The very next line calls start(), which checks that value once, synchronously. If the check runs before the assignment lands, GPS never turns on for the rest of that run.",
        },
        {
          tag: "DISCOVERY",
          title: "Why the iPhone was unaffected",
          body: "Same call order, yet the iPhone never hit this. Adding the pre-flight check to TakeoffView had it call prepareTracking() ahead of time, so GPS was already running by the time start() ran - the race never had a chance to matter. The Watch had no such pre-step, so it was fully exposed.",
        },
        {
          tag: "ACTION",
          title: "Removing the race entirely",
          body: "Brought the same prepareTracking()/stopTracking() pattern to the Watch. Split the GPS-start logic out of start() completely, so start() no longer reads startOrigin at all.",
        },
        {
          tag: "RESULT",
          title: "Unified platform architecture",
          body: "Added a didStartFlight flag to distinguish a normal ROTATE entry from bailing out mid-countdown. iOS and Watch now share the same architecture, which has made it easier to read the two platforms' code side by side since.",
        },
      ],
    },
    {
      id: "pace-corruption",
      number: "08",
      title: "A stored inf pace corrupting the calendar's monthly average",
      status: "RESOLVED",
      squawk: "The live pace on screen looked fine, but the monthly/weekly average pace always came out as --:--",
      steps: [
        {
          tag: "FINDING",
          title: "Screen and storage disagreed",
          body: "The live PFD pace calculation already had an isFinite guard, so the screen safely showed --'--\" whenever the math broke down. saveRunningData(), which persists to SwiftData, had no such guard.",
        },
        {
          tag: "ROOT CAUSE",
          title: "inf propagating downstream",
          body: "Dividing by zero distance returns inf in Swift - no crash, just a silently invalid Double. That inf got saved as-is, and a single inf mixed into the reduce that computes the monthly average was enough to corrupt the entire sum, wiping out that month's average.",
        },
        {
          tag: "ACTION",
          title: "Guarding both write and read paths",
          body: "Added an isFinite guard at save time so unrepresentable values are stored as 0, plus a second isFinite filter at aggregation time as a backstop. WatchPFDView.swift had the identical calculation, so the same guard went there too.",
        },
        {
          tag: "FINDING",
          title: "A follow-up bug",
          body: "Found a separate issue where stopping a run seconds after starting produced a wildly spiked pace. Not inf this time - just an unrealistically large finite value from dividing a tiny distance by a tiny time, which slipped right past the isFinite guard.",
        },
        {
          tag: "RESULT",
          title: "Thresholds and cleanup",
          body: "Added a minimum valid distance (50m) and a realistic pace ceiling (30 min/km). Deleted the 14 already-corrupted records with a one-off cleanup script. The lesson: 'invisible on screen' isn't the same as 'safe' - what actually gets persisted needs its own guarantee.",
        },
      ],
    },
    {
      id: "mirroring-scope-narrowing",
      number: "09",
      title: "Narrowing the mirroring scope - Watch-led runs go fully standalone",
      status: "RESOLVED",
      squawk: "A cluster of bugs that only ever showed up in Watch-led mirroring - missing routes, duplicate stop events, crossed GPS tracking, a stuck Dynamic Island",
      steps: [
        {
          tag: "FINDING",
          title: "The pattern",
          body: "Re-auditing all four mirroring combinations (app-led/Watch-led x app-ends/Watch-ends) in code, more than half of every bug found so far traced back to exactly one combination: Watch leading while iPhone had to mirror it live.",
        },
        {
          tag: "DISCOVERY",
          title: "What the crossed GPS tracking actually was",
          body: "WatchPFDView's doc comment claimed '.onDisappear cleans up state,' but there was no such handler in the code. Leaving via the Digital Crown never stopped GPS tracking, so an orphaned session kept running and overlapped with the next run.",
        },
        {
          tag: "DISCOVERY",
          title: "Same root cause behind the Dynamic Island",
          body: "updateCruise(), which refreshes the Live Activity, was only ever called from iPhone's own GPS stream - never from the flightData messages received from Watch. When Watch led, the Live Activity was structurally stuck at its start screen.",
        },
        {
          tag: "ACTION",
          title: "The trade-off",
          body: "Instead of full bidirectional mirroring, kept app-led mirroring (still needed for Watch sensor data) and branched on startOrigin so Watch never even attempts mirroring when it leads. On stop, it just falls back to the existing standalone-run path, delivering the record to iPhone's Logbook.",
        },
      ],
      verdict:
        "Accepted the reality that most people aren't looking at their phone while a Watch-led run is happening. Decided iPhone didn't need to mirror it live, and deliberately narrowed the scope to match actual usage instead of chasing full bidirectional mirroring. This walks back one of the four scenarios that entry #01 (mirroring redesign) had originally built out.",
    },
    {
      id: "session-id-duplicate-save",
      number: "10",
      title: "Duplicate saves during mirroring - cleaned up with a shared session ID",
      status: "RESOLVED",
      squawk: "Ending a run on Watch mid-mirroring and immediately starting a new one saved the same run to the log multiple times",
      steps: [
        {
          tag: "FINDING",
          title: "The real-device symptom",
          body: "Watch ended a run while mirroring, but the iPhone was still alive. Resuming on Watch right after, Watch and iPhone both kept collecting their own location data at the same time, and ending the Watch run again logged the same run three separate times.",
        },
        {
          tag: "ROOT CAUSE",
          title: "No shared identifier for \"this is the same run\"",
          body: "Each device just saved whatever run ended on its own side, with no way to check whether the other device was talking about the same run. Even a slightly delayed stop signal was enough for a new run and a stale session to get tangled together.",
        },
        {
          tag: "ACTION",
          title: "Introduced a shared session ID",
          body: "The device that starts the run issues a UUID and holds it as runSessionID, sending it along with every flightData message and the final save message. At save time, that same value becomes SwiftDataFlight.id, so a record that already exists under that id is never saved again.",
        },
        {
          tag: "ACTION",
          title: "Guarded the receiving side too",
          body: "Once Watch starts its own new run (startOrigin == .local), it now ignores any stale flightData still arriving from iPhone. The same guard was mirrored on iPhone's side for the opposite direction.",
        },
        {
          tag: "DISCOVERY",
          title: "Cleaned up iPhone's native mirroring receiver too",
          body: "While digging into this, found that HealthKitService+iOS.swift's retrieveRemoteSession() wasn't actually used for heart-rate delivery or for saving to Apple Health - either way already went through a different path. Keeping it registered only risked breaking the save guard or pushing PFDView onto the navigation stack twice, so the registration was disabled.",
        },
      ],
      verdict:
        "Entry #09 already removed Watch-led mirroring itself, but the code that let iPhone receive Watch's mirrored session back was still sitting there. Now the start side is decided by iPhone alone, full stop, and the stop side confirms it's the same run via the shared session ID.",
    },
    {
      id: "runningmode-vs-startorigin",
      number: "11",
      title: "Stop signal not reaching iPhone - switched from runningMode to startOrigin",
      status: "RESOLVED",
      squawk: "When iPhone launches the Watch app via startWatchApp to lead mirroring, ending the run on Watch never ended it on iPhone",
      steps: [
        {
          tag: "FINDING",
          title: "The real-device symptom",
          body: "When iPhone led mirroring by launching the Watch app through startWatchApp, ending the run on Watch never ended the run on iPhone at all.",
        },
        {
          tag: "ROOT CAUSE",
          title: "Quietly depending on the code entry #10 had just disabled",
          body: "WatchViewModel decided whether to tell iPhone about its own stop based on runningMode == .mirrored, but runningMode only flips to .mirrored when startMirroringToCompanionDevice() succeeds. Entry #10 had disabled retrieveRemoteSession() - the listener that handshake needs on iPhone's side - so that call could now fail, leaving runningMode stuck at .standalone and sendStopSignal() never firing.",
        },
        {
          tag: "ACTION",
          title: "Swapped the condition",
          body: "Switched the check from runningMode to startOrigin != .local. startOrigin gets set unconditionally in AppDelegate.handle() regardless of whether that handshake succeeds, and stopWorkout() never touches it, so it's still there by the time the stop event gets handled.",
        },
      ],
      verdict:
        "A side effect of disabling retrieveRemoteSession() in entry #10. A reminder that removing code means checking what else was quietly leaning on it too - this time, a completely different function's branching logic.",
    },
    {
      id: "gpws-reset-clears-mission-data",
      number: "12",
      title: "Shared reset() Wiping Mission Targets Along With Everything Else",
      status: "RESOLVED",
      squawk: "Mission Flight targets (pace/distance) kept vanishing on screen transitions or restarts, with no obvious cause",
      steps: [
        {
          tag: "FINDING",
          title: "Found while splitting off a hotfix",
          body: "Found this while rushing an unmerged heart-rate branch out as a standalone v1.0 hotfix. RunningCenter.reset() was called defensively not just on screen transitions but inside start() too - and that call was wiping modeAData (the mission target) every single time.",
        },
        {
          tag: "ROOT CAUSE",
          title: "One function, two unrelated jobs",
          body: "The defensive reset() in start() only existed to stop elapsedTime/flightData from carrying over stale values - it was never meant to touch modeAData. But because both lived in the same function, every screen transition and every restart guard wiped the mission target too.",
        },
        {
          tag: "ACTION",
          title: "Split the responsibility",
          body: "Pulled target-clearing out into its own clearModeAData(). reset() no longer touches modeAData at all, and only RunViewModel/WatchViewModel's resetState() calls clearModeAData() explicitly.",
        },
      ],
      verdict:
        "When two unrelated jobs - \"cleanup for a screen transition\" and \"defensive reset on restart\" - live in the same function, a change meant for one keeps leaking into the other. Splitting responsibility by function was the whole fix.",
    },
    {
      id: "swiftdata-migration-default-value",
      number: "13",
      title: "SwiftData's Silent Lightweight Migration Failure",
      status: "RESOLVED",
      squawk: "Only ever tested by delete-and-reinstall, which meant existing users updating in place risked a failed migration",
      steps: [
        {
          tag: "FINDING",
          title: "A blind spot in the test method",
          body: "Added target/heartRate fields to SwiftDataAlert for heart-rate-based GPWS, but every test cycle so far had been delete-and-reinstall - meaning the actual migration path had never once been exercised.",
        },
        {
          tag: "ROOT CAUSE",
          title: "init defaults are invisible to migration",
          body: "The new fields' defaults lived only in the init() parameters. SwiftData's automatic lightweight migration fills in new fields on existing records by reading the property declaration's default value - init parameter defaults aren't visible to it at all.",
        },
        {
          tag: "ACTION",
          title: "Move the default onto the declaration",
          body: "Added the default value directly at the property declaration. Further research turned up cases where crashes still happen even with that in place - Apple's own forums call this \"expected behavior.\" A fully safe path needs a multi-stage VersionedSchema migration: optional first, then promoted to required.",
        },
      ],
      verdict:
        "Delete-and-reinstall testing never exercises the migration path at all. Any schema change now gets checked at least once via an in-place update from the prior version.",
    },
    {
      id: "cloudkit-backup-save-policy-and-index",
      number: "14",
      title: "Two CloudKit Backup Bugs - Save Policy and a Missing Queryable Index",
      status: "RESOLVED",
      squawk: "The second backup onward silently reported \"0 backed up,\" and the CloudKit Dashboard couldn't even query the records",
      steps: [
        {
          tag: "FINDING",
          title: "Bug 1 - silently failing from the second backup on",
          body: "The backup button created records fine in the CloudKit Dashboard the first time, but the second press reported \"0 backed up.\"",
        },
        {
          tag: "ROOT CAUSE",
          title: "A change-tag mismatch buried inside the result",
          body: "modifyRecords(saving:deleting:)'s default save policy (.ifServerRecordUnchanged) compares against the server record's change tag, but a freshly-created local record has none - so it reads as a conflict and fails. That failure never throws; it's buried inside the per-record Result, so nothing looked wrong on the surface.",
        },
        {
          tag: "ACTION",
          title: "Switched to unconditional overwrite",
          body: "Switched to savePolicy: .changedKeys so the local state always wins.",
        },
        {
          tag: "FINDING",
          title: "Bug 2 - the Dashboard couldn't query it",
          body: "Backups succeeded, but an unconditional query in the CloudKit Dashboard threw \"Field 'recordName' is not marked queryable.\"",
        },
        {
          tag: "ROOT CAUSE",
          title: "recordName has no index by default",
          body: "CKQuery needs a Queryable index on any field used in a condition or sort, and recordName doesn't get one by default. An unconditional query (NSPredicate(value: true)) was internally falling back to recordName and hitting that wall.",
        },
        {
          tag: "RESULT",
          title: "Changed the query and added the index",
          body: "Rewrote the query to filter on the date field instead, sidestepping recordName entirely, and added a QUERYABLE index on recordName from Schema > Indexes in the Dashboard as well.",
        },
      ],
      verdict:
        "An API that buries failures inside a result value instead of throwing means \"success-shaped failures\" need the return value itself checked, not just the absence of an error. It's also easy to forget that the Dashboard's own query and the app's code can hit CloudKit very differently.",
    },
    {
      id: "tts-audio-ducking-cross-device",
      number: "15",
      title: "km-split TTS goes unheard - session activation and cross-device audio isolation",
      status: "KNOWN LIMITATION",
      squawk: "km-split voice announcements go unheard while music plays, and never come through at all during watch-only runs",
      steps: [
        {
          tag: "FINDING",
          title: "The real-device symptom",
          body: "Running with music on, the km-split announcement was inaudible entirely. SpeechAnnouncerService configures AVAudioSession with .duckOthers so music ducks only while announcing, but that activation call only fired once at run start. Once a music app grabbed the session mid-run and interrupted it, nothing ever reactivated it.",
        },
        {
          tag: "ACTION",
          title: "First fix, then the opposite problem",
          body: "Reactivating the session right before every speak() call fixed that, but a second real-device test showed music staying ducked for the entire run instead of just a few seconds. A leftover activation call in start() was the cause. Ducking follows session activation, not the speak() call itself, so that call was removed and an AVSpeechSynthesizerDelegate callback (didFinish/didCancel) now deactivates the session the instant speech ends.",
        },
        {
          tag: "DISCOVERY",
          title: "Audio sessions don't cross devices",
          body: "During a watch-only run with music playing on iPhone, the TTS was never audible at all. AirPods stay bluetooth-paired to both devices, but only one device owns the actual audio stream at a time. AVAudioSession is a fully separate instance per device, so nothing the Watch configures can reach iPhone's audio.",
        },
        {
          tag: "FINDING",
          title: "Nike Run Club hits the same wall",
          body: "Community reports showed Nike Run Club has the identical limitation, and the only fix they offer is playing music from the Watch itself. This wasn't our app's bug. It's a structural limit across the whole Apple ecosystem.",
        },
      ],
      verdict:
        "Fixed both on-device ducking bugs, but the cross-device audio isolation itself can't be solved in code. Added a note in the app's announcements screen instead, asking users to play music from the Watch itself. Not every problem gets solved by code. Sometimes an honest heads-up is the actual answer.",
    },
    {
      id: "watch-crown-distance-step-gap",
      number: "16",
      title: "Watch Distance Crown Stopping on Awkward Values",
      status: "RESOLVED",
      squawk: "Turning the Digital Crown to set a CUSTOM distance landed on odd values like 500m, 600m, 1.1km, 1.6km",
      steps: [
        {
          tag: "FINDING",
          title: "A TODO already sitting in the code",
          body: "Turning the crown from the 100m minimum kept landing on awkward values. A \"// needs fixing\" comment was already sitting right there in the code.",
        },
        {
          tag: "ROOT CAUSE",
          title: "The starting point wasn't a multiple of the step",
          body: "The crown binding started at 0.1 (100m) and added 0.5 each turn. Since 100m isn't a multiple of 0.5, every value after it inherited that same offset.",
        },
        {
          tag: "ACTION",
          title: "Switched to indexing a step array",
          body: "Changed the crown to drive an index into a precomputed distanceSteps array instead of the distance itself. 100m sits as a one-off exception at the front, followed by a clean 0.5km grid with half/full marathon (21.1km/42.2km) slotted in. Preset buttons (3K/5K/10K/HALF/FULL) were switched to look up their index too.",
        },
      ],
      verdict:
        "A common but easy-to-miss arithmetic bug - when the starting point and the step size aren't multiples of each other, that mismatch just keeps compounding.",
    },
    {
      id: "sink-rate-stuck-crash",
      number: "17",
      title: "SINK RATE Stuck and Force Quit - a Combination Bug That Only Showed Up on the Third Pass",
      status: "RESOLVED",
      squawk: "Slowing down after OVERSPEED gets stuck on SINK RATE, deviation climbs to 300 seconds, then the app force-quits",
      steps: [
        {
          tag: "FINDING",
          title: "Reproduced right after release",
          body: "Shortly after 1.3 shipped, slowing down in response to an OVERSPEED warning correctly switched to SINK RATE, but speeding back up never returned it to NORMAL. The deviation number kept climbing to 300 seconds, and the Watch app eventually force-quit.",
        },
        {
          tag: "ROOT CAUSE",
          title: "Stationary detection and pace calculation were watching different things",
          body: "Samples with negative GPS confidence (speedAccuracy) were reliably skipped by stationary detection (isStationary), but the speed smoothing used for pace calculation kept updating unconditionally outside that check. The moment you slow down hard in response to OVERSPEED is exactly when GPS confidence tends to go negative, so stationary detection never confirmed while the smoothed speed kept getting pulled toward zero.",
        },
        {
          tag: "DISCOVERY",
          title: "Cross-checked with heart-rate mode",
          body: "Heart-rate-based GPWS doesn't go through this smoothing calculation at all - it reads live heart rate directly - and it had no problem under the same conditions. That confirmed the bug lived specifically in the pace calculation path.",
        },
        {
          tag: "ACTION",
          title: "Fix",
          body: "Moved the smoothing update inside the same speedAccuracy check as stationary detection. An untrustworthy speed sample now leaves both stationary detection and pace calculation exactly where they were.",
        },
        {
          tag: "FINDING",
          title: "A second bug found while verifying the fix",
          body: "While confirming this fix, a separate issue turned up: SINK RATE/OVERSPEED haptics kept buzzing the whole time you were resting. The existing logic that froze GPWS while stationary meant that if the state right before you stopped happened to be a warning, that warning stayed frozen, keeping the alert screen and its repeating haptic loop running.",
        },
        {
          tag: "RESULT",
          title: "Reset instead of freeze",
          body: "Changed it so pausing resets GPWS to normal instead of freezing it. New false alerts from a resting heart rate are still suppressed, and any warning active right before stopping now clears the instant you stop. Shipped as 1.3.1.",
        },
      ],
      verdict:
        "This bug wasn't introduced all at once, it came from two separate changes made while preparing v1.3 overlapping. First, stationary detection was reworked from scratch around raw speed. Later, for a completely unrelated reason (suppressing false alerts from a resting heart rate), freeze-while-stationary logic was added on top. Each change was reasonable on its own; nobody realized at the time that the rule in stationary detection could break the assumption the later freeze logic depended on. It was a bug that only showed up in the relationship between two changes, not in either one read alone.",
    },
    {
      id: "health-duplicate-save-owner",
      number: "18",
      title: "The Same Run Twice in Health - Removing a Duplicate and Deciding an Owner Were Different Jobs",
      status: "RESOLVED",
      squawk: "A mirrored run appears twice in the Health workout list, once as iPhone and once as Apple Watch",
      steps: [
        {
          tag: "FINDING",
          title: "A comment that was not true",
          body: "Two entries started at the same second, both sourced from RunWay, differing only in device. A code comment said saving to Apple Health happened only through the Watch builder. It did not. iPhone also attaches a builder to its session and begins collecting, and leaving that builder unfinished at the end lets the system close it out and save whatever it gathered.",
        },
        {
          tag: "ACTION",
          title: "Blocking one side",
          body: "During mirroring the iPhone builder is discarded. Discarding unconditionally would leave nobody saving when running without a watch, so it only applies while mirroring.",
        },
        {
          tag: "DISCOVERY",
          title: "It split by who ended the run",
          body: "On device, ending from the watch worked, but ending from the phone left nothing in Health at all. Ending on the watch goes through the HealthKit delegate, which finishes the workout. Arriving as a stop signal from the phone does not touch that delegate. The phone discarded its own builder and the watch never finished, so nobody saved.",
        },
        {
          tag: "RESULT",
          title: "Deciding the rule first",
          body: "Settling on \"the device with the sensors saves\" made both fixes obvious. The watch now finishes on the remote stop path too, and the phone checks mirroring before clearing that state rather than after. finishWatchWorkout() also ends the session before ending collection, since the remote path arrives with the session still running.",
        },
      ],
      verdict:
        "At first this looked like reducing two savers to one. It was really about deciding which device owns the save. Without that decision, blocking one side meant nobody saved on the blocked path and both saved on the other. Removing a duplicate and deciding an owner were different jobs.",
    },
    {
      id: "watch-touchdown-teardown",
      number: "19",
      title: "A Leftover Screen That Ended the Next Run - Two Wrong Hypotheses and One Sentence From the Reporter",
      status: "RESOLVED",
      squawk: "Starting a run from the phone shows PFD on the watch for a moment, then drops back to the home screen",
      steps: [
        {
          tag: "FINDING",
          title: "Someone else's symptom",
          body: "Reported by a user on 1.3.1 and not reproducible on my own device. Tracing every path that clears the watch navigation left exactly one, and the user had pressed nothing, so something was ending the run on their behalf.",
        },
        {
          tag: "ACTION",
          title: "Two wrong hypotheses",
          body: "First guess was a stop signal from the previous run queued and delivered late. A reproduction recipe went out and nothing reproduced; the recipe turned out to sidestep the very condition it was testing. Second guess was the splash screen withholding the NavigationStack for 1.5 seconds, which felt certain until a follow-up detail arrived: fine after a full quit, broken only from the background. Exactly backwards.",
        },
        {
          tag: "DISCOVERY",
          title: "They never viewed the summary",
          body: "The third detail was the answer. Ending a run on the watch shows a landing screen, and leaving it without tapping summary means onDisappear never fires on backgrounding, so the teardown never runs. When the next run starts, PFD is pushed over that leftover screen, and the covered screen's onDisappear finally fires and tears down the run that just began.",
        },
        {
          tag: "RESULT",
          title: "Telling covered from left",
          body: "The teardown now skips while a workout session is running. Leaving normally still passes, since the session has already ended by then. A new run also replaces the navigation path instead of stacking on the previous one. Everything written for the two wrong hypotheses was reverted.",
        },
      ],
      verdict:
        "onDisappear cannot tell \"the user left\" from \"another screen covered this one\". The larger lesson sits elsewhere. Both wrong hypotheses came from reading code; the right one arrived only after the reporter said they had not viewed the summary. Told the repro failed, I questioned the recipe instead of the hypothesis. For a bug someone else hit, no amount of reading fills in the conditions. Only they know them.",
    },
    {
      id: "ghost-viewmodel-blocked-save",
      number: "20",
      title: "The Copy That Would Not Die - a Second View Model From @State Was Blocking the Save",
      status: "RESOLVED",
      squawk: "Only mirrored runs ended on the watch fail to reach the app's logbook (Health records them fine)",
      steps: [
        {
          tag: "FINDING",
          title: "One case out of four",
          body: "Ending from the app, running with the watch off, and watch-only runs all saved. Only ending from the watch failed, which meant the save function itself was fine. But all four early returns in it were silent, so there was no way to tell which one had fired.",
        },
        {
          tag: "ACTION",
          title: "Printing the order",
          body: "Each early return got a reason, collected in order and shown together, on screen as well since this had to be checked outdoors. Ten lines came back, and two looked wrong: the duplicate guard read as off both times, and the same run reported 0m on one pass and 264m on another.",
        },
        {
          tag: "DISCOVERY",
          title: "There were two view models",
          body: "A @State initial value on an App struct is rebuilt every time SwiftUI re-creates the struct, and only the first is kept. The discarded ones had already subscribed in init(), and a Task holding self strongly while awaiting a stream that never ends kept them alive. The duplicate guard is per-instance, so it never fired, and the ghost running first cleared shared state that the real instance then needed.",
        },
        {
          tag: "RESULT",
          title: "Checking each iteration",
          body: "Both Tasks became weak and check whether the object is still alive on every iteration. Discarded instances now deallocate, and their subscriptions end with them. Rolling back to the 1.3.1 commit and repeating the test failed the same way, confirming this was not introduced by the current work.",
        },
      ],
      verdict:
        "Only one save path goes through the subscription, which is why the other three looked fine. The ghost had nowhere to show itself there. It was also receiving every other subscription from init(), not just stop signals; the failed save was simply the most visible symptom. That a @State initial value gets built more than once was known. That a discarded copy keeps working once subscriptions are involved was not.",
    },
    {
      id: "watch-stop-waiting-on-save",
      number: "21",
      title: "A save that never returned, with the stop signal queued behind it",
      status: "RESOLVED",
      squawk: "A run ended on the watch leaves the iPhone sitting on the running screen",
      steps: [
        {
          tag: "FINDING",
          title: "No condition would hold",
          body: "It was intermittent, and trying again always worked. It only showed up on long runs, yet one failed at 40 minutes and another was fine at 114, so length drew no line either. The worse part was that the iPhone had nothing to show. With no signal arriving, nothing happens at all, so there was no way to tell a signal never sent from one lost in transit from one received and discarded.",
        },
        {
          tag: "ACTION",
          title: "Build a way to read it first",
          body: "Every step between the button and the signal got a line of its own. But the watch simulator does not persist what an app writes to the system log: six hours of it held zero lines from our app while system apps logged normally. The symptom appeared in the simulator and the log could only be read on a real device, so the place it reproduced and the place it could be read were different places. Writing the same lines to a file inside the app's own folder got around it.",
        },
        {
          tag: "DISCOVERY",
          title: "Measure a healthy stop first",
          body: "A failed trace says nothing if you do not know how far it is supposed to go, so a successful stop was captured end to end first. Ten seconds from the button to the iPhone reaching home, six of them inside one call: the watch saving its workout to HealthKit. With that baseline, the missing line in a failed trace was obvious.",
        },
        {
          tag: "ROOT CAUSE",
          title: "The save never came back",
          body: "On the day it reproduced, the trace stopped at \"finishing\". The system log showed collection ending in 3.5 seconds and the save that follows never completing. Nine minutes later it still had not, and the iPhone had recorded nine minutes and ten seconds more than the run actually lasted. The stop signal was published only after that save returned.",
        },
        {
          tag: "ACTION",
          title: "Turn the two around",
          body: "The publish moved ahead of the save. The iPhone does not need the watch's HealthKit write to finish in order to end its own run. Nothing was removed; the save still runs, just behind the signal instead of in front of it.",
        },
        {
          tag: "RESULT",
          title: "Ten seconds down to three",
          body: "On a run of the same length, button to home is now 3.2 seconds. On a six-hour-forty-one-minute run the save took 26 seconds and the iPhone was home in 4.2, twenty-four seconds before the save finished. A safety net landed with it: ten seconds of silence from the watch shows that the app is waiting, and fifteen asks whether to end the run here.",
        },
      ],
      verdict:
        "What changed was the order, not the save. Why the watch's save stalls on some runs and not others is still unknown. It is not length and it is not volume: the six-hour run wrote far more and finished, while the stalled one wrote to the database faster. The fix did not depend on that answer, though. The iPhone never had a reason to wait on the watch's save in the first place. Explaining a fault completely and removing what the user lives through are not always the same piece of work.",
    },
  ],
  releases: [
    {
      version: "v1.4",
      date: "2026.10",
      items: [
        "Fixed the app staying on the running screen after a run was ended from the watch",
        "The app now tells you when watch data stops arriving, and asks whether to end the run if it does not come back",
        "New Debrief tab, analyzing pace patterns, heart rate response, and alert distribution across your saved runs",
        "Added FLIGHT DATA RECORDER: pick any moment of a past run and see the pace, heart rate, cadence and altitude it was recording, along with where on the course you were (recorded every 5 seconds, for runs saved from this version on)",
        "You can now choose the app language between Korean, English, and Japanese in Settings",
        "Fixed paused time counting toward split pace and the FLIGHT DATA RECORDER timeline",
        "A haptic now marks every kilometre, not just the voice",
        "Tap a date in the Flight Calendar to go straight to that day's runs",
        "Flight Calendar now marks how many runs a day holds with dots",
        "The app tells you when a new version is on the App Store",
        "Flight Summary, Flight Calendar and the Logbook now show running time",
        "Smoother scrolling and screen transitions when opening a long run's record",
        "The altitude scale no longer spans a wider range than the run actually covered",
        "Start and finish points are now told apart by colour on the map",
        "Fixed location tracking continuing after a run ended until you left the summary screen",
        "Fixed the watch briefly showing the previous run's values right after a new run starts",
        "Fixed the watch saving a value one lower than the target pace or tolerance you picked",
        "Fixed one run being able to make the whole iCloud backup fail",
      ],
    },
    {
      version: "v1.3.2",
      date: "2026.10",
      items: [
        "Fixed runs recorded with a mirrored Apple Watch being saved twice in the Health app",
        "Fixed runs ended on the watch not being saved to the app",
        "Fixed watch-only runs that could fail to reach the iPhone",
        "Fixed the next run ending immediately when the watch summary screen was left without being viewed",
        "Fixed GPWS alerts being recorded on the map too often",
        "Made alerts clear faster",
        "The inactivity reminder now repeats instead of firing only once",
        "Improved how Apple Watch status is shown on the pre-flight screen",
      ],
    },
    {
      version: "v1.3.1",
      date: "2026.09",
      items: [
        "Fixed GPWS getting stuck after OVERSPEED/SINK RATE and causing a crash",
        "Fixed GPWS haptic alerts continuing to vibrate while paused",
        "Added a Settings option to turn off the 7-day inactivity reminder",
      ],
    },
    {
      version: "v1.3",
      date: "2026.08",
      items: [
        "Fixed Watch-only runs occasionally not being saved",
        "Improved pause detection speed when standing still",
        "Added distinct haptic patterns per GPWS alert type",
        "Fixed Digital Crown step spacing when setting the target distance on Watch",
        "Added pinch-to-zoom on the route map in the flight summary",
        "Added a reminder notification for when you haven't run in over a week",
        "Organized the Alerts screen by month",
        "Added the ability to delete individual run records",
        "Enlarged the END FLIGHT button on Watch",
      ],
    },
    {
      version: "v1.2",
      date: "2026.07",
      items: [
        "Added voice announcements for km splits (TTS)",
        "Improved Mission Flight target pace/heart-rate display",
        "Changed the map's end marker",
        "Added a Settings screen",
        "Added iCloud backup/restore",
        "Redesigned Logbook (records grouped by month/week)",
        "Fixed run-ending and voice announcement issues during watch-only runs",
      ],
    },
    {
      version: "v1.1",
      date: "2026.07",
      items: [
        "Fixed Mission Flight GPWS alerts (SINK RATE/OVERSPEED) not showing",
        "Fixed being unable to end a run from the GPWS alert screen",
        "Fixed the remaining-distance display in MINIMUMS alerts",
        "Fixed Watch-only runs not reaching iPhone",
      ],
    },
    {
      version: "v1.0",
      date: "2026.06",
      items: ["RunWay launch"],
    },
  ],
};
