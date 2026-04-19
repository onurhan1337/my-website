import { ImageResponse } from "next/og";
import { getBlogPost, getAllBlogPosts } from "@/app/db/blog";

export const dynamic = "force-static";
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  const title = post?.metadata.title ?? "Onurhan Demir";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            onurhan.dev
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 48px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#a7f3d0",
              lineHeight: 1.2,
              textAlign: "center",
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    size
  );
}
