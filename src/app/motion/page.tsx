"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
// import * as motion from "motion/react-client"; - 서버 컴포넌트

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(!isVisible);
  }
  return (
    <>
        <div className="flex h-100 items-center justify-center gap-5">
      <motion.div
        className="h-24 w-24 rounded-lg border shadow-md"
        initial={{ opacity: 0, y: 0 }} //시작상태
        animate={{ rotate: 360, opacity: 1, y: 20, transition: { duration: 1, repeat: 3 }, }} //끝 상태 + 어떻게 이동할것인지
      />
      <motion.div
        className="h-24 w-24 rounded-lg border shadow-md"
        whileHover={{scale:1.2}}
        whileTap={{scale:0.9}}
      />
      <motion.div
        className="h-24 w-24 rounded-lg border shadow-md"
        initial={{ x: 100 }}
        animate={{ x: 0, transition: { duration: 1, type: "spring", bounce: 0.4 } }}
      />
      </div>
      <div>
        <button className="cursor-pointer" onClick={handleClick}>Click me</button>
        <AnimatePresence>
          {isVisible && (
              <motion.div
                className="h-24 w-24 rounded-lg border shadow-md"
                initial={{ opacity: 0 }}
                animate={{opacity: 1, transition:{ duration: 1 }}}
                exit={{opacity: 0, transition:{ duration: 1 }}}
              />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
