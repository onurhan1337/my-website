# onurhan.dev

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Upstash Redis](https://upstash.com/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Like**: [Upstash Claps](https://github.com/upstash/claps)

## Overview

- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction), claps.
- `pages/post/*` - Static pre-rendered blog pages using MDX.
- `pages/sitemap.xml.tsx` - Automatically generated sitemap.
- `pages/feed.xml.tsx` - Automatically generated RSS feed.
- `pages/*` - All other static pages.
- `components/*` - All components.
- `public/*` - Static assets including images for blogs and other all images.
- `data/posts` - Contains MDX blogs.
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