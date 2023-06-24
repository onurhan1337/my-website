"use client";

import { useState, useEffect } from "react";
import Giscus from "@giscus/react";
import { GISCUS_CONFIG } from "@/lib/giscus";

const Comment = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="my-8">
      <Giscus {...GISCUS_CONFIG} />
    </div>
  );
};

export default Comment;
