"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Loader() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setTimeout(() => setOn(false), 1300); return () => clearTimeout(t); }, []);
  return (<AnimatePresence>{on && (<motion.div exit={{ opacity: 0 }} transition={{ duration: .6 }} className="fixed inset-0 z-[100] grid place-items-center bg-bg">
    <div className="w-48"><p className="mb-3 font-display text-sm text-mute">Initializing</p>
      <div className="h-px bg-surface"><motion.div className="h-px bg-lime" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.1 }} /></div></div>
  </motion.div>)}</AnimatePresence>);
}
