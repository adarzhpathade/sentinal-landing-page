"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { FAQ_DATA, type FAQItem } from "@/data/faq";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, useInView } from "motion/react";
import ScrambleHover from "@/components/ui/ScrambleHover";

export interface FaqProps {
  className?: string;
}

export const Faq: React.FC<FaqProps> = ({ className }) => {
  const [openId, setOpenId] = useState<string | null>(null); // Start with none open
  const sectionRef = React.useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-20 w-full bg-[#141314] py-16 text-[#EEEEEE] md:py-24",
        className
      )}
      aria-label="FAQ Section"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left Column: Heading */}
          <div className="w-full md:w-1/3">
            <h2 className="font-sans text-[32px] leading-[1] font-normal tracking-tight md:text-[40px] lg:text-[48px]">
              Common questions.
            </h2>
          </div>

          {/* Right Column: Accordion */}
          <div className="w-full md:w-[60%]">
            <div className="flex flex-col border-t border-[rgba(255,255,255,0.08)]">
              {FAQ_DATA.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  isSectionInView={isSectionInView}
                  onToggle={() => toggleOpen(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

Faq.displayName = "Faq";

const AccordionItem = ({
  item,
  isOpen,
  isSectionInView,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  isSectionInView: boolean;
  onToggle: () => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="border-b border-[rgba(255,255,255,0.08)]">
      <button
        onClick={onToggle}
        className={cn(
          "group flex w-full items-center justify-between py-4 text-left transition-colors",
          isOpen ? "text-[#FB460D]" : "text-[#EEEEEE]"
        )}
        aria-expanded={isOpen}
      >
        <div className="flex w-fit items-center">
          <div
            className={cn(
              "h-2 overflow-hidden bg-[#FB460D] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isOpen ? "mr-3 w-2" : "mr-0 w-0"
            )}
          />
          <span className="font-mono text-[12px] leading-tight font-normal md:text-[14px]">
            <ScrambleHover
              text={item.question}
              sequential={true}
              scrambleSpeed={20}
              scrambledClassName="text-[#FB460D]"
              triggerOnView={false}
              customHoverState={isSectionInView}
            />
          </span>
        </div>
        <span className="ml-4 shrink-0 font-mono text-[14px] md:text-[16px]">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="pr-8 pb-4"
            >
              <p className="font-sans text-[12px] leading-relaxed text-[rgba(255,255,255,0.6)] md:text-[14px]">
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
