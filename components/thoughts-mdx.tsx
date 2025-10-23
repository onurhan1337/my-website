import { MDXRemote } from "next-mdx-remote/rsc";
import { ExpandableCode } from "./expandable-code";

const components = {
  code: ExpandableCode,
};

export function ThoughtsMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
