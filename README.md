# onurhan.dev

<a href="https://www.buymeacoffee.com/onurhan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=onurhan&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" /></a>

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Upstash Redis](https://upstash.com/)
- **Post and Snippet**: [Contentlayer](https://www.contentlayer.dev/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Like**: [Upstash Claps](https://github.com/upstash/claps)

## Overview

- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction), claps.
- `app/post/*` - Static pre-rendered blog pages using Contentlayer.
- `app/snippet/*` - Static pre-rendered code snippets using Contentlayer.
- `app/*` - All other static pages.
- `components/` - All components.
- `components/ui` - Primitive components.
- `public/*` - Static assets including images for blogs and other all images.
- `data/` - Contains all posts and snippets.
- `lib/`- Contains metadata and util functions.
- `types/`- Contains all types and interfaces.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Demo

```bash
https://onurhan.dev
```

## Running Locally

This application requires Node.js v16.13+.

```bash
git clone https://github.com/onurhan1337/my-website.git
cd my-website
npm install
npm run dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/onurhan1337/my-website/blob/master/.env.example). You don't need to fill them out for the site to work. However, it is required to be able to use the [Upstash/Claps](https://github.com/upstash/claps) package.

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Inspiration

- [@ademilter](https://twitter.com/ademilter)
- [@rauchg](https://twitter.com/rauchg/)
- [@shadcn](https://twitter.com/shadcn)
- [@leerob](https://twitter.com/leeerob)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
