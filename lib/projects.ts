export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  highlights: { title: string; description: string }[];
  tags: string[];
  category: "open-source" | "e-commerce" | "web" | "saas";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "kizzle-studio",
    title: "Kizzle Studio",
    description: "E-commerce development studio — Shopify & ikas partner.",
    longDescription:
      "Kizzle Studio is an e-commerce development studio I founded, specializing in Shopify and ikas platforms. As an official partner of both platforms, I build custom themes, applications, and integrations that solve complex commerce challenges. From corporate invoicing workflows to AI-powered analytics, I create tailored solutions that help businesses grow.",
    image: "/images/projects/kizzle.png",
    screenshots: [
      "/images/projects/kizzle-detail-1.jpeg"
    ],
    highlights: [
      { title: "Multi-platform", description: "Official partner of both Shopify and ikas — delivering solutions across the two leading e-commerce platforms." },
      { title: "Custom Development", description: "From bespoke themes to complex integrations and custom apps tailored to each client's unique needs." },
      { title: "Proven Results", description: "Delivered projects for THELOOD, Iron Athletics Club, and Kalemsy with measurable improvements in conversion and UX." },
    ],
    tags: ["Shopify", "Ikas", "E-commerce", "TypeScript", "React"],
    category: "e-commerce",
    liveUrl: "https://kizzle.studio",
    featured: false,
    date: "2025-01-01",
  },
  {
    id: "2",
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "Personal portfolio website with an MDX-powered blog, microblog, and work timeline — built with Next.js and TypeScript.",
    longDescription:
      "This very website — a modern, fast personal portfolio built with Next.js, TypeScript, and Tailwind CSS. Features blog posts with MDX, a thoughts microblog, work experience timeline, and project showcases. Optimized for performance with static export deployed on Cloudflare Pages.",
    image: "/images/projects/portfolio.png",
    screenshots: [],
    highlights: [
      { title: "Static Export", description: "Fully static site with zero runtime overhead. Every page pre-rendered at build time for maximum performance." },
      { title: "Rich Content", description: "Blog powered by MDX with custom components, interactive code blocks, and auto-generated table of contents." },
      { title: "Microblog", description: "A thoughts section with filterable posts, pagination, and spring animations powered by framer-motion." },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    category: "open-source",
    githubUrl: "https://github.com/onurhan1337/my-website",
    liveUrl: "https://onurhan.dev",
    featured: false,
    date: "2022-08-09",
  },
  {
    id: "3",
    slug: "zen",
    title: "Zen",
    description: "Kanban-style project management tool for teams with real-time collaboration, drag-and-drop boards, and workspaces.",
    longDescription:
      "A collaborative project management tool built for modern teams. Zen provides an intuitive Kanban-style board interface with real-time collaboration, drag-and-drop task organization, team workspaces, and comprehensive project tracking. Built to help teams stay organized, focused, and productive.",
    image: "/images/projects/zen.png",
    screenshots: [],
    highlights: [
      { title: "Kanban Boards", description: "Intuitive drag-and-drop boards for visual task management across all project stages." },
      { title: "Real-time Sync", description: "Team members see updates instantly with collaborative editing and live state synchronization." },
      { title: "Workspaces", description: "Organize projects into workspaces with granular access control and team management." },
    ],
    tags: ["TypeScript", "React", "Project Management"],
    category: "open-source",
    githubUrl: "https://github.com/onurhan1337/zen",
    featured: false,
    date: "2024-03-15",
  },
  {
    id: "4",
    slug: "thelood",
    title: "TheLood",
    description: "Shopify storefront optimization — UX, CRO, and performance improvements for thelood.com.tr.",
    longDescription:
      "I transformed TheLood's existing Shopify infrastructure into a stronger user experience through comprehensive conversion, merchandising, and performance-focused development. The existing theme was analyzed in detail and rebuilt to better reflect the brand identity with a smoother, more optimized storefront experience. Rather than using off-the-shelf theme features, I re-architected them to match the brand language and user behavior, reducing friction throughout the purchase flow.",
    image: "/images/projects/thelood.png",
    screenshots: [
      "/images/projects/thelood-detail-1.jpeg",
    ],
    highlights: [
      { title: "Shopify Theme Customizations", description: "Deep theme customization aligned with brand identity for a cohesive storefront experience." },
      { title: "Product Page UX", description: "Redesigned product page experience with improved information hierarchy and purchase flow." },
      { title: "CRO & Upsell Flows", description: "Conversion rate optimization with upsell and cross-sell flows integrated into the shopping journey." },
      { title: "Campaign & Landing Pages", description: "Custom campaign and landing page developments tailored to marketing initiatives." },
      { title: "Performance & SEO", description: "Speed optimizations and SEO improvements for better discoverability and user experience." },
    ],
    tags: ["Shopify", "E-commerce", "UX", "CRO", "Performance"],
    category: "e-commerce",
    liveUrl: "https://www.thelood.com.tr",
    featured: false,
    date: "2025-06-01",
  },
  {
    id: "5",
    slug: "iron-athletics-club",
    title: "Iron Athletics Club",
    description: "Brand-led e-commerce store built on ikas — custom theme development with 20+ pages delivered in 23 days.",
    longDescription:
      "I built a custom theme from scratch for Iron Athletics Club on the ikas platform — 20+ pages designed and developed with full ikas integration, delivered in 23 days.\n\nAfter the initial launch, I continued with an ongoing collaboration model. For the RESTOCK.02 launch, I delivered major updates, improvements, and customer experience enhancements.\n\nEvery feature was designed to directly improve sales performance: upsell and cross-sell campaigns to increase average order value, cart menu optimizations with recommended products, coupon codes, free shipping bar, and tiered gift rewards, quick-add popups on product pages, and countdown heroes with live stock indicators on launch pages.",
    image: "/images/projects/iron-athletics-club.png",
    screenshots: [
      "/images/projects/iac-detail-1.avif",
    ],
    highlights: [
      { title: "Custom ikas Theme", description: "20+ page custom theme built from scratch on ikas, delivered in 23 days with full platform integration." },
      { title: "Upsell & Cross-sell", description: "Strategic campaigns and in-cart flows that increase average order value across the shopping journey." },
      { title: "Cart Optimization", description: "Recommended products, coupon codes, free shipping bar, and tiered gift rewards in the cart menu." },
      { title: "Quick Add", description: "Product page quick-add popup for frictionless purchasing and faster checkout flow." },
      { title: "RESTOCK.02", description: "Post-launch optimizations across product pages, navigation, mobile experience, and launch workflows." },
    ],
    tags: ["ikas", "E-commerce", "Theme Development", "Storefront", "Campaigns"],
    category: "e-commerce",
    liveUrl: "https://ironathleticsclub.com",
    featured: true,
    date: "2026-06-10",
  },
    {
    id: "6",
    slug: "outranked",
    title: "Outranked",
    description: "Automatically push sold-out products to the bottom of your collections.",
    longDescription:
      "Outranked automatically moves sold-out products to the bottom of your collections on your schedule. Choose which collections to sort, exclude products by tag, and keep merchandising focused on in-stock products. Get email or Slack notifications when sorts run, monitor collection health and sort history in the analytics dashboard, export CSV reports, and set low-stock alerts with custom rules.",
    image: "/images/projects/outranked.png",
    screenshots: [
      "/images/projects/outranked-detail-1.jpeg",
      "/images/projects/outranked-detail-2.jpeg",
    ],
    highlights: [
      { title: "Scheduled Auto-Sorting", description: "Automatically pushes out-of-stock products to the bottom of your collections on a schedule you control." },
      { title: "Per-Collection Controls", description: "Choose which collections to sort and exclude specific products by tag for fine-grained merchandising." },
      { title: "Low Stock Alerts", description: "Configurable low-stock alerts with custom rules delivered via email and Slack." },
      { title: "Notifications", description: "Email and Slack notifications with detailed sort summaries after every run." },
      { title: "Analytics Dashboard", description: "Monitor collection health, view sort history, and export CSV reports." },
    ],
    tags: ["Shopify", "E-commerce", "Automation", "Shopify App"],
    category: "e-commerce",
    liveUrl: "https://outranked.kizzle.studio",
    featured: true,
    date: "2026-04-23",
  },
  {
    id: "7",
    slug: "quiver",
    title: "Quiver",
    description: "Custom Shopify app for Kalemsy — cache product data, variant pencil images, and a customizable theme extension.",
    longDescription:
      "Quiver is a custom Shopify app built for Kalemsy. When the store owner caches their products, the data is saved to a database. Each product can be assigned 4 variant pencil images with attribute information for filtering. Built as a Shopify theme extension, Quiver can be placed anywhere in the theme and all text and structure is fully customizable. Bulk CSV and ZIP upload support lets you update hundreds of products in minutes.",
    image: "/images/projects/quiver.png",
    screenshots: [],
    highlights: [
      { title: "Product Data Caching", description: "Cache product data to a database (Hono.js, Cloudflare, Supabase) for fast and reliable access." },
      { title: "Variant Pencil Images", description: "Assign 4 variant pencil images per product with attribute data for filter-based discovery." },
      { title: "Theme Extension", description: "Shopify theme extension that can be placed anywhere in the theme with fully customizable markup and text." },
      { title: "Bulk Upload", description: "CSV and ZIP bulk upload support — update hundreds of products and images in minutes." },
      { title: "Custom Attributes", description: "Customizable attribute fields for filter-based product discovery, editable by the store owner." },
    ],
    tags: ["Shopify", "Shopify App", "E-commerce", "Hono.js", "Cloudflare", "Supabase"],
    category: "e-commerce",
    featured: false,
    date: "2026-04-01",
  },
  {
    id: "8",
    slug: "recoil",
    title: "Recoil",
    description: "Personal knowledge management app with AI-powered semantic search and interactive knowledge graph visualization.",
    longDescription:
      "Recoil helps you capture, organize, and retrieve your notes using semantic search. The app generates embeddings for your notes, enabling you to find related content based on meaning rather than keywords. An AI chat assistant answers questions using your notes as context, and an interactive knowledge graph visualizes semantic connections between your ideas.",
    image: "/images/projects/recoil.png",
    screenshots: [],
    highlights: [
      { title: "Semantic Search", description: "Find notes by meaning using vector embeddings and cosine similarity — not just keyword matches." },
      { title: "AI Chat", description: "Ask questions and get answers based on your notes with citations to source material." },
      { title: "Knowledge Graph", description: "Interactive visualization of semantic relationships between your notes for serendipitous discovery." },
      { title: "Collections & Templates", description: "Organize notes into logical groups and create reusable note structures with templates." },
      { title: "Reminders & Analytics", description: "Schedule email and in-app notifications, track note creation patterns and category distributions." },
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "AI", "React"],
    category: "open-source",
    githubUrl: "https://github.com/onurhan1337/recoil",
    featured: false,
    date: "2026-01-12",
  },
  {
    id: "9",
    slug: "ottoman-mezar",
    title: "Ottoman Mezar",
    description: "Corporate website for a marble company — custom design, Sanity CMS, and SEO optimization.",
    longDescription:
      "I rebuilt Ottoman Mezar's website from the ground up with a focus on performance, SEO, and user experience. A comprehensive project including custom web design and development, Sanity CMS integration for a fully editable architecture, welcome video optimization, Google Analytics integration for traffic and behavior tracking, and SEO implementation. Hosting and domain configuration were completed along with contact form integration and product catalog management.",
    image: "/images/projects/ottoman-mezar.png",
    screenshots: [
      "/images/projects/ottoman-mezar-detail-1.jpeg",
    ],
    highlights: [
      { title: "Custom Design & Development", description: "Built from scratch with brand-focused design, typography refinement, and a polished visual identity." },
      { title: "Sanity CMS", description: "Fully editable architecture with Sanity CMS — the client can manage all content independently." },
      { title: "Video & Performance", description: "Optimized welcome video delivery and performance tuning for fast load times across devices." },
      { title: "Google Analytics", description: "Traffic and behavior tracking with Google Analytics for data-driven decisions." },
      { title: "SEO & Infrastructure", description: "SEO implementation, hosting configuration, domain setup, and contact form integration." },
    ],
    tags: ["Web Development", "Sanity CMS", "SEO", "Performance"],
    category: "web",
    featured: false,
    liveUrl: "https://ottomanmezar.com",
    date: "2026-03-04",
  },
  {
    id: "10",
    slug: "asta",
    title: "Asta",
    description: "AI-powered SaaS platform with structured AI output, Stripe payments, and a performance-optimized Node.js backend.",
    longDescription:
      "I designed and developed Asta from scratch as an AI-powered SaaS platform. Landing page, dashboard, Node.js backend, Stripe payment integration, and structured AI output — all layers delivered end-to-end. The backend uses batching and service workers for workload management under high traffic. AI integration delivers consistent, processable results through structured output. The dashboard transforms complex data into an intuitive interface, and Stripe handles subscriptions and payment flows seamlessly.",
    image: "/images/projects/asta.png",
    screenshots: [
      "/images/projects/asta-detail-1.png",
    ],
    highlights: [
      { title: "Node.js Backend", description: "Batching and service workers for efficient workload management and stable performance under high traffic." },
      { title: "AI Integration", description: "Structured output for consistent, processable AI results with reliable production performance." },
      { title: "Dashboard", description: "Intuitive interface that transforms complex AI data into clear, actionable insights." },
      { title: "Stripe Payments", description: "Subscription and payment flow integration with seamless checkout and billing management." },
      { title: "End-to-End Delivery", description: "Landing page, dashboard, backend, and payments — all layers delivered as a cohesive platform." },
    ],
    tags: ["AI", "SaaS", "Node.js", "Stripe", "Next.js"],
    category: "saas",
    featured: false,
    liveUrl: "https://useasta.com",
    date: "2026-12-01",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
