import { PIZZA_DEMO_BASE } from "@/lib/pizza-demo/constants";
import { ECOMMERCE_DEMO_BASE } from "@/lib/ecommerce-demo/constants";
import { DASHBOARD_DEMO_BASE } from "@/lib/dashboard-demo/constants";
import { STUDIO_DEMO_BASE } from "@/lib/studio-demo/constants";
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "/resume" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export type ProjectCategory = "Unity" | "Web" | "AR/VR";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  image: string;
  liveUrl?: string;
  projectUrl?: string;
  ctaLabel?: string;
  /** If set, project card opens detail modal with embed (e.g. itch.io game or video). */
  embedUrl?: string;
  /** When embedUrl is a video (e.g. Google Drive), show iframe directly; otherwise game with Play overlay. `site` = full-page web app iframe (e.g. deployed Next app). */
  embedType?: "video" | "game" | "site";
  /** For video embeds: "16/9" | "4/3" | "1/1". Match to your video file to avoid stretch. */
  embedAspectRatio?: "16/9" | "4/3" | "1/1";
  /** Short bullet points for the project detail modal (e.g. gameplay highlights). */
  modalHighlights?: string[];
  /** Focal point when fitting `image` into the 16:9 card / play poster (`object-cover` / `bg-cover`). */
  thumbnailObjectPosition?:
    | "top"
    | "center"
    | "bottom"
    | "left-bottom"
    | "left-center";
  /** Shown under the description in the project detail modal (e.g. collaboration credit). */
  collaborators?: string;
  /** Poster-style title on project cards (and optionally the modal hero). */
  thumbnailOverlay?: {
    headline: string;
    subline?: string;
    /** Default top band + gradient; `center` stacks title in the middle of the poster. */
    placement?: "top" | "center";
    /** Red headline with black outline (cartoon / arcade poster). */
    headlineTone?: "red-outline";
    /** If false, overlay appears only on grid/carousel cards, not on the modal image. Default true. */
    showInModal?: boolean;
  };
  /** Ordered screenshots with captions for modal walkthrough (no embed required). */
  screenshotGallery?: { src: string; title: string; description: string }[];
}

/** True when the project card should open the detail modal (embed or screenshot walkthrough). */
export function projectOpensDetailModal(project: Project): boolean {
  return !!(project.embedUrl || project.screenshotGallery?.length);
}

/** Grouped by category for the Projects section: Unity, Web/Apps, AR/VR */
export const projectCategories: { label: string; category: ProjectCategory }[] = [
  { label: "Unity Projects", category: "Unity" },
  { label: "Web Projects & Apps", category: "Web" },
  { label: "AR/VR", category: "AR/VR" },
];

/** Iframe + “open demo” URL: built-in route, or override with `NEXT_PUBLIC_PIZZA_DEMO_URL` if you host a copy elsewhere. */
const PIZZA_HOUSE_EMBED_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_PIZZA_DEMO_URL?.trim()
    ? process.env.NEXT_PUBLIC_PIZZA_DEMO_URL.replace(/\/$/, "")
    : PIZZA_DEMO_BASE;

const ECOMMERCE_DEMO_EMBED_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_ECOMMERCE_DEMO_URL?.trim()
    ? process.env.NEXT_PUBLIC_ECOMMERCE_DEMO_URL.replace(/\/$/, "")
    : ECOMMERCE_DEMO_BASE;

const DASHBOARD_DEMO_EMBED_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_DASHBOARD_DEMO_URL?.trim()
    ? process.env.NEXT_PUBLIC_DASHBOARD_DEMO_URL.replace(/\/$/, "")
    : DASHBOARD_DEMO_BASE;

const STUDIO_DEMO_EMBED_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_STUDIO_DEMO_URL?.trim()
    ? process.env.NEXT_PUBLIC_STUDIO_DEMO_URL.replace(/\/$/, "")
    : STUDIO_DEMO_BASE;

export const projects: Project[] = [
  // Unity Projects
  {
    id: "zombie-crusher",
    title: "Zombie Crusher",
    description:
      "Adrenaline-fueled action game: fight hordes of zombies with a weaponized car. Earn upgrades, unlock maps, and dominate with speed, steel, and savage upgrades.",
    category: "Unity",
    tech: ["Unity", "C#", "HTML5", "WebGL"],
    image: "/images/ZombieCrusherImage.png",
    thumbnailObjectPosition: "top",
    liveUrl: "https://altindemaj.itch.io/zombie-crusher",
    ctaLabel: "Play on itch.io",
    embedUrl: "https://itch.io/embed-upload/14123077?color=333333",
    modalHighlights: [
      "2D top-down action game",
      "Drive a weaponized car and crush zombies",
      "Collect money from defeated zombies",
      "Upgrade your car (engine, armor, tires, weapons)",
      "Unlock new maps and tougher enemies",
    ],
  },
  {
    id: "florify",
    title: "Florify",
    description:
      "A cozy planting game: you have three plots to grow flowers, discover 27 different plants from seeds, and earn new seeds by growing the right blooms. Sell seeds you don't need and remove plants to make room for your collection.",
    category: "Unity",
    tech: ["Unity", "C#", "HTML5", "WebGL"],
    image: "/images/FlorifyGame.png",
    liveUrl: "https://altindemaj.itch.io/florify",
    ctaLabel: "Play on itch.io",
    embedUrl: "https://itch.io/embed-upload/9401866?color=333333",
    thumbnailObjectPosition: "top",
    modalHighlights: [
      "Three spaces to plant and manage your garden",
      "Discover 27 plants by planting and combining seeds",
      "Earn new seeds by growing different flowers",
      "Sell seeds and remove plants you don't want",
      "Play in the browser on itch.io",
    ],
  },
  {
    id: "lost-signal",
    title: "Lost Signal",
    description:
      "A tense horror experience built in Unity: the power is out, lines are dead, and nobody can call for help. You’re the one trying to bring the electricity back — but the deeper you go into the dark, the less certain you are about what’s really wrong. Gameplay footage; not a browser build.",
    category: "Unity",
    tech: ["Unity", "C#", "Horror", "3D"],
    image: "/images/LostSignalGame.png",
    thumbnailObjectPosition: "center",
    liveUrl:
      "https://drive.google.com/file/d/1eOjxk0JIIYb5wU7sWiQWXe_3Q-t0Jp15/view?usp=sharing",
    ctaLabel: "Watch video",
    embedUrl:
      "https://drive.google.com/file/d/1eOjxk0JIIYb5wU7sWiQWXe_3Q-t0Jp15/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    collaborators: "Collaborated with Eduard Dibrani.",
    modalHighlights: [
      "Restore power while the world stays eerily offline — no calls, no signals",
      "Pressure rises as you work through failing systems and empty corridors",
      "Horror that escalates the further you push into the mystery",
      "Built in Unity — watch gameplay footage in the modal",
    ],
  },
  {
    id: "last-to-blast",
    title: "Last to Blast",
    description:
      "A fast, chaotic Unity multiplayer game in pixel art. Pick a name, pile into the lobby, and ready up. When the round starts, one player carries a live bomb — everyone else runs, dodges, and tries not to catch the pass. Two minutes on the clock, power-ups to freeze rivals or jump higher, and eliminations that send you to spectate any survivor you choose. When the fuse wins, the blast reshuffles who’s left — until one player remains.",
    category: "Unity",
    tech: ["Unity", "C#", "Multiplayer", "Netcode"],
    image: "/images/SecondWallpaper.png",
    thumbnailObjectPosition: "center",
    thumbnailOverlay: {
      headline: "Last To Blast",
      placement: "center",
      headlineTone: "red-outline",
      showInModal: false,
    },
    ctaLabel: "View walkthrough",
    modalHighlights: [
      "Host / client / server flow for real multiplayer sessions",
      "Bomb carrier vs runners — handoffs decide who’s on the clock",
      "Superpowers: freeze, mobility, and more to swing the chase",
      "Spectate any player after you’re out; clear win state when one remains",
    ],
    screenshotGallery: [
      {
        src: "/images/MenuScene.png",
        title: "Name & connect",
        description:
          "Enter your display name and jump in as host, client, or dedicated server. The menu sits over a cozy pixel bedroom while you line up the session.",
      },
      {
        src: "/images/LobbySceneServer.png",
        title: "Lobby — ready up",
        description:
          "Everyone joins the same room, sees who’s in, and hits ready when they’re set. The host keeps the session in sync before the match loads.",
      },
      {
        src: "/images/StartingGAME.png",
        title: "The bomb drops",
        description:
          "One player starts tagged with the bomb; the rest scatter through the arena. You’ve got two minutes before it blows — stay away from the carrier or steal the handoff on purpose. Power-ups let you freeze opponents, leap higher, and bend the chase in your favor.",
      },
      {
        src: "/images/SpectateMode.png",
        title: "Spectate after elimination",
        description:
          "When you’re out, you’re not stuck on a static screen — follow any living player, swap targets, and keep up with the chaos until the round resolves.",
      },
      {
        src: "/images/Winner.png",
        title: "Blast resolves — winner crowned",
        description:
          "When the timer hits zero the bomb detonates on whoever’s holding it. If more players remain, the fight continues; if only one is left standing, the win screen makes it official.",
      },
    ],
  },
  // Web Projects & Apps
  {
    id: "room-planner-threejs",
    title: "Room Planner",
    description:
      "A Three.js web app to design apartment layouts from scratch: draw custom room sizes, place furniture, tweak materials and wall colors, and stage full ambient spaces. Built with Erion Dibrani as the browser companion to the AR Measurement App — lay out and furnish in the editor, then review the same workflow in AR on device.",
    category: "Web",
    tech: ["Three.js", "WebGL", "JavaScript", "AR workflow"],
    image:
      "/images/Room%20planner%20app%20interface%20in%20action.png",
    liveUrl:
      "https://drive.google.com/file/d/1zWRGO2BnQlTMfwWC2GwhUmqNJGoGH8HF/view?usp=sharing",
    ctaLabel: "Watch demo",
    embedUrl:
      "https://drive.google.com/file/d/1zWRGO2BnQlTMfwWC2GwhUmqNJGoGH8HF/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    collaborators:
      "Built with Erion Dibrani. Pairs with the AR Measurement App (AR/VR): scan real dimensions in AR, then design and furnish here; view the result back in AR.",
    modalHighlights: [
      "Custom room shapes and sizes — build the floor plan you need, not a preset grid",
      "Place and arrange furniture; tune colors and materials for walls and spaces",
      "Same pipeline as AR Measurement: real measurements from AR feed the 3D layout",
      "Round-trip workflow: refine on the web, then view the layout again in AR",
    ],
  },
  {
    id: "pizza-house-order",
    title: "Pizza House — Online Ordering",
    description:
      "Self-contained demo at `/demo/pizza-house` in this site: menu with photos and per-size pricing, cart, checkout with a stylized map and address form, mock confirmation, and admin order list. Front-end only — cart and orders live in `localStorage` in this browser; no payments or server. A real build could swap in Supabase and Resend. Use the live demo below to try the full flow.",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Resend"],
    image: "/images/pizza-house-app/hero.jpg",
    thumbnailObjectPosition: "center",
    liveUrl: PIZZA_HOUSE_EMBED_URL,
    embedUrl: PIZZA_HOUSE_EMBED_URL,
    embedType: "site",
    ctaLabel: "View details",
    modalHighlights: [
      "Menu: pick S/M/L per pizza, adjust quantities, and jump to checkout from the live cart",
      "Checkout: delivery map area, saved addresses, and full address form with driver notes",
      "Mock confirmation — no email; real deploy would use Resend (or similar)",
      "Admin — orders: local queue with status workflow (new → preparing → out → done)",
    ],
    screenshotGallery: [
      {
        src: "/images/pizza-house-app/menu.jpg",
        title: "Menu & ordering",
        description:
          "Demo UI: photo tiles per pizza, S/M/L pricing, quantity controls, and a cart sidebar — same patterns as the live route.",
      },
      {
        src: "/images/pizza-house-app/checkout-location.jpg",
        title: "Checkout, location & delivery",
        description:
          "Checkout with a stylized map, saved addresses, address fields, and order summary — all simulated client-side.",
      },
      {
        src: "/images/pizza-house-app/confirmation.jpg",
        title: "Order confirmation",
        description:
          "Success screen after placing an order (demo), with a link to Admin to view the queue in this browser.",
      },
      {
        src: "/images/pizza-house-app/admin.jpg",
        title: "Admin — order queue",
        description:
          "Admin queue with line items, totals, and status controls — backed by localStorage in the demo.",
      },
    ],
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Atlas Market — interactive storefront demo: catalog, cart, checkout, and orders (client-side only, no backend).",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    image: "/images/ecommerce-demo/hero.jpg",
    thumbnailObjectPosition: "center",
    liveUrl: ECOMMERCE_DEMO_EMBED_URL,
    embedUrl: ECOMMERCE_DEMO_EMBED_URL,
    embedType: "site",
    ctaLabel: "View details",
    modalHighlights: [
      "Light DTC-style storefront: hero, trust row, editorial imagery, search, filters, and product cards with ratings",
      "Product detail with image gallery, quantity, and cart — inventory is demo-only in this browser",
      "Cart and checkout with shipping threshold, tax estimate, and simulated payment",
      "Orders list for mock fulfillment — data stays in localStorage",
    ],
    screenshotGallery: [
      {
        src: "/images/ecommerce-demo/screenshots/storefront.jpg",
        title: "Storefront",
        description:
          "Actual screenshot of the live demo: hero, trust row, editorial blocks, search, categories, and product grid.",
      },
      {
        src: "/images/ecommerce-demo/screenshots/product-detail.jpg",
        title: "Product detail",
        description:
          "PDP screenshot (wireless headphones): breadcrumbs, gallery, rating, price, quantity, and add to cart.",
      },
      {
        src: "/images/ecommerce-demo/screenshots/checkout.jpg",
        title: "Checkout",
        description:
          "Checkout with a seeded cart: contact and shipping fields plus order summary; Pay is simulated locally.",
      },
      {
        src: "/images/ecommerce-demo/screenshots/orders.jpg",
        title: "Orders",
        description:
          "Order history with sample line items and totals — data is from the demo’s localStorage in this browser.",
      },
    ],
  },
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    description:
      "Admin dashboard demo for a pharmacy inventory workflow: stock visibility, low-stock alerts, out-of-stock items, category pressure, and a sortable inventory table. Includes a small pharmacy-themed microsite with local imagery.",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS"],
    image: "/images/dashboard-demo/pharmacy/cover.jpg",
    thumbnailObjectPosition: "center",
    liveUrl: DASHBOARD_DEMO_EMBED_URL,
    embedUrl: DASHBOARD_DEMO_EMBED_URL,
    embedType: "site",
    ctaLabel: "View details",
    modalHighlights: [
      "Microsite at /demo/admin-dashboard — pharmacy example hero, local photo gallery, and CTA into the stock dashboard",
      "Live console: available SKUs, low stock, out of stock, expiring soon; 7 / 30 / 90 day range chips",
      "Dispensed vs restocked chart, low-stock categories, critical attention list, and sortable inventory table",
      "Client-only mock data — legacy /demo/interactive-dashboard redirects to this microsite",
    ],
    screenshotGallery: [
      {
        src: "/images/dashboard-demo/screenshots/01-overview.jpg",
        title: "Console — overview",
        description:
          "Screenshot of the live console: stock KPI cards and date-range chips (7 / 30 / 90 days).",
      },
      {
        src: "/images/dashboard-demo/screenshots/02-charts.jpg",
        title: "Charts",
        description:
          "Recharts line and bar charts — dispensed vs restocked and low-stock categories (mock).",
      },
      {
        src: "/images/dashboard-demo/screenshots/03-table.jpg",
        title: "Inventory table",
        description:
          "Sortable inventory snapshot: SKU, product, category, on hand, reorder point, shelf, status.",
      },
      {
        src: "/images/dashboard-demo/screenshots/04-range-7d.jpg",
        title: "Range switch",
        description:
          "Same UI with a different range selected — metrics update client-side.",
      },
    ],
  },
  {
    id: "creative-studio-site",
    title: "Studio Website",
    description:
      "Creative studio marketing demo — hero, work grid, services, and contact form. Demo only.",
    category: "Web",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/images/studio-demo/screenshots/01-hero.jpg",
    thumbnailObjectPosition: "center",
    liveUrl: STUDIO_DEMO_EMBED_URL,
    embedUrl: STUDIO_DEMO_EMBED_URL,
    embedType: "site",
    ctaLabel: "View details",
    modalHighlights: [
      "Hero with gradient mesh, CTAs to work and contact anchors",
      "Work section: four case-study cards with hover zoom on imagery",
      "Services: three engagement models (discovery, production, retainer)",
      "Contact: name, email, message + hidden honeypot; Framer Motion on sections",
    ],
    screenshotGallery: [
      {
        src: "/images/studio-demo/screenshots/01-hero.jpg",
        title: "Hero",
        description:
          "Screenshot of the live demo hero — full-bleed wallpaper and typography.",
      },
      {
        src: "/images/studio-demo/screenshots/02-work.jpg",
        title: "Selected work",
        description:
          "Screenshot of the work grid from the same demo route.",
      },
      {
        src: "/images/studio-demo/screenshots/03-services.jpg",
        title: "Services",
        description:
          "Screenshot of the services section — discovery, production, retainer.",
      },
      {
        src: "/images/studio-demo/screenshots/04-contact.jpg",
        title: "Contact",
        description:
          "Screenshot of the contact form and demo submit behavior.",
      },
    ],
  },
  // AR/VR
  {
    id: "ar-furniture",
    title: "AR Furniture for Your Home",
    description:
      "Augmented reality app that lets you place and preview furniture in your space in real time. Built for immersive home planning and visualization.",
    category: "AR/VR",
    tech: ["Unity", "C#", "AR", "Mobile"],
    image: "/images/ar-furniture.png",
    liveUrl: "https://drive.google.com/file/d/1yY4tcpKGw9mi4MNeAe1JmIT88JX2c6FD/view?usp=sharing",
    ctaLabel: "Watch video",
    embedUrl: "https://drive.google.com/file/d/1yY4tcpKGw9mi4MNeAe1JmIT88JX2c6FD/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    modalHighlights: [
      "Place virtual furniture in your room using AR",
      "Real-time preview on mobile",
      "Built with Unity for AR experiences",
    ],
  },
  {
    id: "ar-portal-museum",
    title: "AR Portal Museum",
    description:
      "An AR experience where you place a portal on your screen, walk through it, and enter a different space. This demo drops you into a small virtual museum; the same flow can target any environment you build.",
    category: "AR/VR",
    tech: ["Unity", "C#", "AR", "Mobile"],
    image: "/images/ARMusemImage.png",
    liveUrl:
      "https://drive.google.com/file/d/1Xcr8pad4l6g5USgubjO9J4aNLm7pplYT/view?usp=sharing",
    ctaLabel: "Watch video",
    embedUrl:
      "https://drive.google.com/file/d/1Xcr8pad4l6g5USgubjO9J4aNLm7pplYT/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    collaborators: "Made in collaboration with Lorent Tiku.",
    modalHighlights: [
      "Real AR portal placed in your environment — step through to another world",
      "Walkthrough features a compact museum-style virtual gallery",
      "Swap the destination space for any scene or experience you design",
    ],
  },
  {
    id: "ar-bmw-car-configurator",
    title: "BMW AR Car Configurator",
    description:
      "An augmented reality car configurator: place a vehicle in your real environment, then customize paint, wheels, and interior, open and close the doors, and drive — all in AR.",
    category: "AR/VR",
    tech: ["Unity", "C#", "AR", "Mobile"],
    image:
      "/images/BMW%20in%20AR_%20Car%20configurator%20experience.png",
    thumbnailObjectPosition: "center",
    thumbnailOverlay: { headline: "AR", subline: "Car Configurator" },
    liveUrl:
      "https://drive.google.com/file/d/1cCz45wEAqwSpNWWQbkISWmnYJqKprWab/view?usp=sharing",
    ctaLabel: "Watch video",
    embedUrl:
      "https://drive.google.com/file/d/1cCz45wEAqwSpNWWQbkISWmnYJqKprWab/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    collaborators: "Built for Yoloway Company.",
    modalHighlights: [
      "Place the car in your space with AR tracking",
      "Full configurator: body color, wheels, interior options",
      "Interactive doors — open and close in real time",
      "Drive the configured vehicle in augmented reality",
    ],
  },
  {
    id: "ar-fashion",
    title: "AR Fashion",
    description:
      "An augmented reality fashion experience: scan a tracked image to explore outfits, watch video previews of each look, and switch styles on the fly. Supports multiple marker images so you can curate different collections.",
    category: "AR/VR",
    tech: ["Unity", "C#", "AR", "Mobile"],
    image: "/images/ARFashion.png",
    thumbnailObjectPosition: "top",
    liveUrl:
      "https://drive.google.com/file/d/1a71o5jUhHmpOwm1zq26kOvGUUjS1VTqI/view?usp=sharing",
    ctaLabel: "Watch video",
    embedUrl:
      "https://drive.google.com/file/d/1a71o5jUhHmpOwm1zq26kOvGUUjS1VTqI/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    modalHighlights: [
      "Image tracking — scan to launch the AR fashion experience",
      "Browse and configure different clothing looks in AR",
      "Watch videos for each outfit before you commit to a style",
      "Multiple reference images for different sets or campaigns",
    ],
  },
  {
    id: "ar-plan-measurement",
    title: "AR Measurement App",
    description:
      "Walk a building in AR and drop points to capture real-world walls and perimeter. Scan a QR code to open the Three.js Room Planner web app: the floor plan syncs from the AR app with matching lengths and outline. Design custom rooms, place furniture, set colors, then jump back into AR to review the layout on site. The Room Planner is listed under Web Projects & Apps — same pipeline, two surfaces (AR capture + browser editor).",
    category: "AR/VR",
    tech: ["Unity", "C#", "AR", "Mobile", "Three.js"],
    image: "/images/ARMeasurementApp.png",
    thumbnailObjectPosition: "left-center",
    thumbnailOverlay: { headline: "AR", subline: "Measurement App" },
    liveUrl:
      "https://drive.google.com/file/d/1TsPn39hHndLufsLLl0otn1M5FHoyCYIk/view?usp=sharing",
    ctaLabel: "Watch video",
    embedUrl:
      "https://drive.google.com/file/d/1TsPn39hHndLufsLLl0otn1M5FHoyCYIk/preview",
    embedType: "video",
    embedAspectRatio: "16/9",
    collaborators:
      "Collaborated with Erion Dibrani on the Three.js Room Planner (Web Projects & Apps).",
    modalHighlights: [
      "Mark building corners in AR to capture walls and true perimeter",
      "QR handoff to Room Planner in the browser — geometry matches the AR scan",
      "Room Planner: custom room sizes, furniture, and colors on the synced plan",
      "Round-trip workflow: refine on the web, then view the result again in AR",
    ],
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "2",
    title: "Game Development",
    description: "Unity games for web and desktop. From prototypes to full releases.",
    icon: "Gamepad2",
  },
  {
    id: "1",
    title: "Web Development",
    description: "Modern, fast websites and web apps with React, Next.js, and TypeScript.",
    icon: "Globe",
  },
  {
    id: "3",
    title: "Interactive Experiences",
    description: "WebGL, 3D, and rich interactive content that engages users.",
    icon: "Sparkles",
  },
  {
    id: "4",
    title: "Custom Digital Solutions",
    description: "Tailored software, APIs, and integrations for your workflow.",
    icon: "Layers",
  },
];

export const siteOwner = {
  name: "Altin Demaj",
  title: "Unity Developer | AR/VR Developer | Full-Stack Developer",
  location: "Prishtine, Kosovo",
  email: "altindemaj.dev@gmail.com",
  phone: "+38349405430",
  website: "https://altindemaj.com",
} as const;

export const resumeData = {
  headline: "Altin Demaj",
  role: "Unity Developer | AR/VR Developer | Full-Stack Developer",
  summary:
    "Highly skilled Unity Developer and Full-Stack Engineer with 5+ years of experience building interactive applications across games, AR/VR experiences, and modern web platforms. Proven ability to design and deliver complete products from concept to deployment, including multiplayer games, mobile experiences, real-time systems, business dashboards, and scalable web applications.",
  summarySecondary:
    "Strong expertise in Unity (2D, 3D, AR, VR) combined with React, Next.js, Node.js, APIs, and database-backed systems. Experienced in creating both creative interactive experiences and practical business tools, including public-facing AR event activations and full-stack web products.",
  experienceYears: "5+ years",
  experience: [
    {
      role: "Unity Developer",
      company: "Vent Studio",
      type: "Game Development",
      period: "2024 – Present",
      bullets: [
        "Working as a Unity developer on The Seventh Mask, a commercial game project being prepared for a future Steam release.",
        "Building and refining gameplay systems, polish passes, and production-ready features as the project moves toward publishing quality.",
        "Handling bug fixing, performance improvements, and stability work to support a strong release candidate.",
        "Contributing to final-stage development tasks including gameplay refinement, UX improvements, and overall launch readiness.",
      ],
      achievements: [
        "Helped bring The Seventh Mask close to Steam publishing readiness.",
        "Supported late-stage production with gameplay polish and technical improvements.",
        "Contributed to a release-focused workflow for a commercial Unity title.",
      ],
    },
    {
      role: "Unity & Full-Stack Developer",
      company: "Yoloway",
      type: "Independent / Own Work",
      period: "2020 – 2024",
      bullets: [
        "Led development across games, AR/VR applications, and web platforms from concept through release.",
        "Built full-stack applications using React, Next.js, Node.js, and integrated databases and APIs.",
        "Designed real-time systems including multiplayer interactions, GPS tracking flows, and live web interfaces.",
        "Integrated backend services with Unity applications for cross-platform products on Android, iOS, WebGL, and PC.",
        "Optimized applications for performance across desktop and mobile devices while maintaining polished UX.",
      ],
      achievements: [
        "Completed multiple commercial and personal projects across interactive media and business software.",
        "Built scalable systems connecting Unity frontends with modern web backends.",
        "Delivered interactive solutions for real-world public use cases and events.",
      ],
    },
  ],
  skillGroups: [
    {
      title: "Game Development",
      items: [
        "Unity (2D, 3D, URP, HDRP)",
        "C# (advanced)",
        "Multiplayer systems",
        "Physics, UI, animation systems",
        "Performance optimization",
      ],
    },
    {
      title: "AR / VR Development",
      items: [
        "Unity AR Foundation",
        "Vuforia",
        "Marker-based & markerless AR",
        "Interactive AR for events, education, and marketing",
        "VR interactions and environments",
      ],
    },
    {
      title: "Full-Stack Web",
      items: [
        "React.js, Next.js, HTML, CSS, Tailwind",
        "Node.js, Express.js",
        "REST APIs and WebSockets",
        "Firebase, MongoDB, SQL",
        "Deployment with Vercel and other hosting platforms",
      ],
    },
    {
      title: "Systems & Tooling",
      items: [
        "Third-party SDK integration",
        "System architecture design",
        "Real-time GPS tracking systems",
        "Cross-platform delivery",
        "Git and collaborative workflows",
      ],
    },
  ],
  projectHighlights: [
    {
      title: "The Seventh Mask",
      category: "Unity / Steam release pipeline",
      description:
        "Working on a Unity game at Vent Studio that is nearing publishing quality and being prepared for a future Steam release, with focus on gameplay polish, optimization, bug fixing, and final-stage production readiness.",
    },
    {
      title: "Advanced Unity Game Development",
      category: "Unity / High-performance gameplay",
      description:
        "Built polished Unity game systems with performance-focused architecture, responsive controls, physics-driven mechanics, progression loops, and scalable code structures for both prototypes and production-ready experiences.",
    },
    {
      title: "Vent Studio Development Experience",
      category: "Unity / Commercial production",
      description:
        "Contributed to studio-based Unity development in a release-oriented environment, focusing on polish, feature completion, bug fixing, and preparing a game for commercial launch.",
    },
    {
      title: "AR Educational & Interactive Applications",
      category: "AR / Education",
      description:
        "Built AR apps with object placement, real-time interaction, and audio-based learning systems, focused on intuitive UX and fast response times.",
    },
    {
      title: "Multiplayer & Game Projects",
      category: "Unity / Games",
      description:
        "Created multiple Unity titles with competitive multiplayer systems, physics-based gameplay, upgrades, progression, and browser/WebGL publishing.",
    },
    {
      title: "Web Applications & Platforms",
      category: "Full-stack web",
      description:
        "Delivered business dashboards, GPS tracking systems, real-time map interfaces, and modern React / Next.js frontends backed by Node.js services and databases.",
    },
    {
      title: "E-Commerce & Business Websites",
      category: "Web / Commerce",
      description:
        "Designed and developed responsive websites with product flows, business-focused UX, checkout experiences, and structured data handling.",
    },
    {
      title: "Portfolio Demo Suite",
      category: "Portfolio / Interactive demos",
      description:
        "Built and refined a portfolio featuring Unity games, AR/VR concepts, interactive web demos, e-commerce flows, and an admin dashboard tailored to pharmacy inventory visibility.",
    },
  ],
  portfolioHighlights: [
    "The Seventh Mask",
    "Zombie Crusher",
    "Florify",
    "Last to Blast",
    "Sunny Hill Festival AR Experience",
    "Room Planner",
    "E-Commerce Platform",
    "Admin Dashboard",
    "AR Furniture for Your Home",
    "AR Measurement App",
  ],
  education: {
    institution: "AAB College",
    field: "Computer Science / Software Engineering",
  },
  languages: [
    "Albanian — Native",
    "English — Professional working proficiency",
  ],
  additionalInfo: [
    "Portfolio website: altindemaj.com — live demos, case studies, and project highlights",
    "Strong problem-solving and system design skills",
    "Able to work independently and deliver complete products",
    "Comfortable across both creative development (games / AR / VR) and business systems (web / apps)",
    "Passionate about building scalable, interactive, and high-performance applications",
  ],
} as const;

export const skills = [
  "Unity",
  "C#",
  "React JS",
  "Next JS",
  "Game Development",
  "Cross-functional Collaboration",
  "Debugging",
  "User Feedback Implementation",
  "Stability Analysis",
  "Problem-solving",
  "Prototyping",
  "User Testing",
  "AR/VR Development",
  "UI/UX Collaboration",
  "Asset Management",
  "Game Publishing",
  "Code Review",
  "Documentation Management",
  "Version Control (Git)",
  "API Integration",
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/AltinDemaj",
    icon: "Github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/altin-demaj-412349372/?skipRedirect=true",
    icon: "Linkedin",
  },
  { label: "Instagram", href: "https://instagram.com/altiindemajj", icon: "Instagram" },
] as const;

export const contactEmail = "altindemaj.dev@gmail.com";
