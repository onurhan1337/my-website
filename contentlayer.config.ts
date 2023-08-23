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

const computedFields = defineComputedFields<"Post">({
  slug: {
    type: "string",
    resolve: (doc: any) => doc._raw.flattenedPath,
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
  filePathPattern: `**/*.mdx`,
  fields: {
    date: { type: "date", required: true },
    title: { type: "string", required: true },
    tweetUrl: { type: "string", required: false },
    subtitle: { type: "string", required: false },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "post",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "poimandres",
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
