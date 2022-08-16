import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";

export const Post = defineDocumentType(() => ({
    name: "Post",
    contentType: "mdx",
    filePathPattern: `posts/*.mdx`,
    fields: {
      date: { type: "date", required: true },
      title: { type: "string", required: true },
      subtitle: { type: "string", required: false },
      tweetUrl: { type: "string", required: false },
    },
    computedFields: {
      slug: {
        type: "string",
        resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
      },
      url: {
        type: "string",
        resolve: (doc) => {
          return `https://onurhan.dev/blog/${doc.slug}`;
        },
      },
    },
  }));
  
  export default makeSource({
    contentDirPath: "content",
    documentTypes: [Post],
    mdx: {
      rehypePlugins: [rehypePrism],
    },
  });