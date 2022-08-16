// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";
var Post = defineDocumentType(() => ({
  name: "Content",
  contentType: "mdx",
  filePathPattern: `content/*.mdx`,
  fields: {
    date: { type: "date", required: true },
    title: { type: "string", required: true },
    subtitle: { type: "string", required: false },
    tweetUrl: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => {
        return `https://onurhan.dev/blog/${doc.slug}`;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypePrism]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-B5SMLMD3.mjs.map
