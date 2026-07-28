"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/utils/cn";

interface ScrambleHoverProps {
  text: string;
  scrambleSpeed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
  triggerOnView?: boolean | "mobileOnly";
  customHoverState?: boolean;
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  text,
  scrambleSpeed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className,
  scrambledClassName,
  sequential = false,
  revealDirection = "start",
  triggerOnView = false,
  customHoverState,
  ...props
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );

  // Ref to hold the latest revealedIndices so the interval effect doesn't rerun on changes
  const revealedIndicesRef = useRef(revealedIndices);
  useEffect(() => {
    revealedIndicesRef.current = revealedIndices;
  }, [revealedIndices]);

  // Trigger once on view if enabled
  useEffect(() => {
    if (triggerOnView && isInView) {
      if (triggerOnView === "mobileOnly" && window.innerWidth >= 768) {
        return; // Do not auto-trigger on desktop
      }
      const timer = setTimeout(() => setIsHovering(true), 0);
      return () => clearTimeout(timer);
    }
  }, [isInView, triggerOnView]);

  // Sync with external hover state if provided
  useEffect(() => {
    if (customHoverState !== undefined) {
      const timer = setTimeout(() => setIsHovering(customHoverState), 0);
      return () => clearTimeout(timer);
    }
  }, [customHoverState]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const getNextIndex = () => {
      const textLength = text.length;
      const revealedSize = revealedIndicesRef.current.size;
      switch (revealDirection) {
        case "start":
          return revealedSize;
        case "end":
          return textLength - 1 - revealedSize;
        case "center":
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSize / 2);
          const nextIndex =
            revealedSize % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedIndicesRef.current.has(nextIndex)
          ) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedIndicesRef.current.has(i)) return i;
          }
          return 0;
        default:
          return revealedSize;
      }
    };

    const shuffleText = (originalText: string) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: revealedIndicesRef.current.has(i),
        }));

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char);

        // Shuffle remaining non-revealed, non-space characters
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [
            nonSpaceChars[j],
            nonSpaceChars[i],
          ];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isSpace) return " ";
            if (p.isRevealed) return originalText[p.index];
            return nonSpaceChars[charIndex++];
          })
          .join("");
      } else {
        return originalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (revealedIndicesRef.current.has(i)) return originalText[i];
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ];
          })
          .join("");
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    if (isHovering) {
      const stateTimer = setTimeout(() => setIsScrambling(true), 0);
      interval = setInterval(() => {
        if (sequential) {
          if (revealedIndicesRef.current.size < text.length) {
            const nextIndex = getNextIndex();
            const nextSet = new Set(revealedIndicesRef.current);
            nextSet.add(nextIndex);
            revealedIndicesRef.current = nextSet;
            setRevealedIndices(nextSet);
            if (nextSet.size >= text.length) {
              setDisplayText(text);
              clearInterval(interval);
              setIsScrambling(false);
            } else {
              setDisplayText(shuffleText(text));
            }
          } else {
            setDisplayText(text);
            clearInterval(interval);
            setIsScrambling(false);
          }
        } else {
          setDisplayText(shuffleText(text));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsScrambling(false);
            setDisplayText(text);
          }
        }
      }, scrambleSpeed);

      return () => {
        clearTimeout(stateTimer);
        if (interval) clearInterval(interval);
      };
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayText(text);
        setRevealedIndices(new Set());
        if (isScrambling) {
          setIsScrambling(false);
        }
      }, 0);
      return () => clearTimeout(resetTimer);
    }
  }, [
    isHovering,
    text,
    characters,
    scrambleSpeed,
    useOriginalCharsOnly,
    sequential,
    revealDirection,
    maxIterations,
    isScrambling,
  ]);

  return (
    <motion.span
      ref={ref}
      onHoverStart={() => customHoverState === undefined && setIsHovering(true)}
      onHoverEnd={() => customHoverState === undefined && setIsHovering(false)}
      className={cn(
        "inline-block cursor-pointer whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => (
          <span
            key={index}
            className={cn(
              revealedIndices.has(index) || !isScrambling || !isHovering
                ? className
                : scrambledClassName
            )}
          >
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
};

export default ScrambleHover;
