import React from "react";
import Head from "next/head";
import ResumeTab from "../components/resume/tab";

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume | Onurhan Demir</title>
        <meta property="og:image" content="/avatar.png" />
        <meta
          name="description"
          content="Visit my resume page to see my skills and experiences"
        />
      </Head>
      <div>
        <section className="text-gray-600 body-font px-4 md:px-16 mx-auto max-w-screen-md">
          <ResumeTab />
        </section>
      </div>
    </>
  );
}
