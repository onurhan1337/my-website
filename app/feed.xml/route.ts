import { getAllBlogPosts } from "@/app/db/blog";

export const revalidate = 18000; // Revalidate every 5 hours

function detectLanguage(text: string): "tr" | "en" {
  const turkishChars = /[çğıöşüÇĞİÖŞÜ]/;
  return turkishChars.test(text) ? "tr" : "en";
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://onurhan.dev";
  const posts = await getAllBlogPosts();

  const rssItems = posts
    .slice(0, 20)
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.metadata.publishedAt).toUTCString();

      const detectedLang = post.metadata.lang
        ? post.metadata.lang
        : detectLanguage(post.metadata.title + " " + post.metadata.summary);
      const language = detectedLang === "tr" ? "tr-tr" : "en-us";

      const modifiedDate = post.metadata.modifiedAt
        ? new Date(post.metadata.modifiedAt).toISOString()
        : null;

      const contentExcerpt = post.content.substring(0, 300).trim();

      return `
    <item>
      <title><![CDATA[${escapeCdata(post.metadata.title)}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${escapeCdata(
        post.metadata.summary
      )}]]></description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[Onurhan Demir]]></dc:creator>
      <dc:language>${language}</dc:language>
      ${modifiedDate ? `<dc:date>${modifiedDate}</dc:date>` : ""}
      <content:encoded><![CDATA[${escapeCdata(
        contentExcerpt
      )}...]]></content:encoded>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Onurhan Demir - Blog]]></title>
    <link>${baseUrl}/blog</link>
    <description><![CDATA[Software development articles, tutorials, and insights on React, Next.js, TypeScript, and modern web technologies.]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>onurhan@onurhan.dev (Onurhan Demir)</managingEditor>
    <webMaster>onurhan@onurhan.dev (Onurhan Demir)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Onurhan Demir</copyright>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>Onurhan Demir</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=18000, stale-while-revalidate=86400",
    },
  });
}

function escapeCdata(value: string): string {
  return value.replace(/]]>/g, "]]]]><![CDATA[>");
}
