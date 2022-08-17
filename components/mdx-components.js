import React from "react";
import cx from "classnames";

function a(props) {
  return <a {...props} />;
}

function strong(props) {
  return <strong className="font-semibold" {...props} />;
}

function hr(props) {
  return (
    <hr className="my-14 border-0 border-b border-black opacity-10 dark:border-white" />
  );
}

function ul(props) {
  return (
    <ul
      className="list-inside list-disc space-y-2 marker:text-gray-800 dark:text-gray-800"
      {...props}
    />
  );
}

function li(props) {
  return (
      <li
          className="space-y-2 marker:text-gray-800 dark:text-gray-800"
          {...props}
      />
  );
}

function ol(props) {
  return <ol className="list-inside list-decimal space-y-2" {...props} />;
}

function blockquote(props) {
  return (
    <blockquote
      className="border-l-4 border-l-zinc-300 bg-gradient-to-r from-zinc-100 to-transparent px-4 py-3 font-serif italic dark:border-l-zinc-600 dark:from-zinc-800"
      {...props}
    />
  );
}

function Quote({ caption, cite, children, ...props }) {
  return (
    <figure
      className="-mx-6 bg-indigo-50 p-6 text-indigo-900 shadow-sm dark:bg-indigo-900 dark:bg-opacity-60 dark:text-indigo-200 sm:rounded-lg"
      {...props}
    >
      <blockquote className="opacity-90">{children}</blockquote>
      <figcaption className="mt-2 font-serif opacity-70">
        {`— ${caption}, `} <cite>{cite}</cite>
      </figcaption>
    </figure>
  );
}

function Figure({ src, title, full = true, width }) {
  const imageStyle = {};

  if (width) {
    imageStyle["width"] = "100%";
    imageStyle["maxWidth"] = width;
  }

  return (
    <figure
      className={cx("text-center", full && "md:-mx-24 lg:-mx-40 xl:-mx-60")}
    >
      <img className="inline-flex rounded-lg" src={src} style={imageStyle} />
      <figcaption className="mx-16 mt-4 text-sm opacity-50">{title}</figcaption>
    </figure>
  );
}

function h2(props) {
  return <h2 className="text-gray-800 text-2xl font-bold leading-tight" {...props} />;
}

function h3(props) {
  return (
    <h3 className="text-gray-800 !mb-2 text-xl font-semibold leading-tight" {...props} />
  );
}

function h4(props) {
  return <h4 className="text-gray-800 !mb-1 text-lg font-semibold leading-snug" {...props} />;
}

function h5(props) {
  return <h5 className="text-gray-800 font-semibold" {...props} />;
}

const MDXComponents = {
  strong,
  a,
  hr,
  ul,
  li,
  ol,
  blockquote,
  h2,
  h3,
  h4,
  h5,
  Quote,
  Figure,
};

export default MDXComponents;