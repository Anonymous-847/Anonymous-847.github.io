"use client";

import { useEffect, useState } from "react";
import { heroRoles } from "@/lib/data";

export default function TypedRole() {
  const [text, setText] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (prefersReducedMotion) {
      timeoutId = setTimeout(() => setText(heroRoles[0]), 0);
      return () => clearTimeout(timeoutId);
    }

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const current = heroRoles[roleIdx];

      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx >= current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx <= 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % heroRoles.length;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 45 : 80);
    }

    timeoutId = setTimeout(tick, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="font-mono text-lg text-cyan-300 sm:text-xl md:text-2xl">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-cyan-300 align-middle">
        &nbsp;
      </span>
    </div>
  );
}
