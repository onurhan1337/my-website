import {
  defineComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

// Define a type for the node parameter
type RehypeNode = {
  // Define the properties you expect in the node
  children: Array<any>;
  properties: {
    className: Array<string>;
    ariaLabel?: string;
  };
  // Add any other properties you expect in the node
  // ...
};

const computedFields = defineComputedFields<any>({
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  readingTime: {
    type: "json",
    resolve: (doc) => {
      return readingTime(doc.body.raw);
    },
  },
});

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `post/**/*.mdx`,
  fields: {
    date: { type: "date", required: true },
    title: { type: "string", required: true },
    tweetUrl: { type: "string", required: false },
    subtitle: { type: "string", required: false },
  },
  computedFields,
}));

const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippet/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    logo: { type: "string", required: true },
    categories: { type: "list", of: { type: "string", required: true } },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Snippet],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        // @ts-expect-error
        rehypePrettyCode,
        {
          theme: "vesper",
          onVisitLine(node: RehypeNode) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: RehypeNode) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: RehypeNode) {
            node.properties.className = ["word--highlighted"];
          },
        },
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
