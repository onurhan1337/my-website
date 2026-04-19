<div align="center">
  <img src="public/logo.svg" alt="Logo" width="56" height="48">
</div>

# onurhan.dev

- **Icons**: [Lucide React](https://lucide.dev/icons/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Syntax Highlight**: [Sugar High](https://github.com/huozhi/sugar-high)
- **Blog**: [Next MDX Remote](https://github.com/hashicorp/next-mdx-remote)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)

## Overview

- `app/blog/*` - Static pre-rendered blog pages using Contentlayer.
- `app/*` - All other pages.
- `components/` - All components.
- `public/*` - Static assets including images for blogs and other all images.
- `content/` - Contains all posts and snippets.
- `thoughts/` - Contains all thoughts.
- `lib/`- Contains metadata and util functions.
- `stores/`- Store files for zustand.
- `types/`- Contains all types and interfaces.
- `styles/*` - Contains all global styles.

## Demo

```bash
https://onurhan.dev
```

## Running Locally

This application requires Node.js v16.13+.

```bash
git clone https://github.com/onurhan1337/my-website.git
cd my-website
pnpm install
pnpm dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/onurhan1337/my-website/blob/master/.env.example). You don't need to fill them out for the site to work.

## Cloning / Forking

Please review the [license](https://github.com/onurhan1337/my-website/blob/master/LICENSE.txt) and remove all of my personal information (resume, blog posts, images, etc.).
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

Deployed on [Cloudflare Pages](https://pages.cloudflare.com/). All pages are statically generated at build time (`force-static`), so MDX content is read from the filesystem during the build — no Node.js runtime is needed on the edge.

# Inspiration

- [@rauchg](https://twitter.com/emilkowalski_)
- [@ademilter](https://twitter.com/ademilter)
- [@leerob](https://twitter.com/leeerob)
- [@shadcn](https://twitter.com/shadcn)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
