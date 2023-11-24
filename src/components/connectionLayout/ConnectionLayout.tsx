import React, { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./connectionLayout.module.css";

const ConnectionLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.background}>
          <AnimatePresence key={pathname}>
            <motion.div
              key={"modal"}
              initial="pageInitial"
              animate="pageAnimate"
              variants={{
                pageInitial: {
                  translateX: -500,
                  opacity: 0,
                },
                pageAnimate: {
                  translateX: 0,
                  opacity: 1,
                  transition: { delay: 0.2 },
                },
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ConnectionLayout;
