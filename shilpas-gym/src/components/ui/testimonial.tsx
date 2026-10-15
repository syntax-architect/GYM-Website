import * as React from "react";
import { motion, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  description: string;
  role?: string;
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState<number>(0);

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 80) {
        setExitX(info.offset.x > 0 ? 250 : -250);
        setTimeout(() => {
          if (info.offset.x > 0) {
            handlePrev();
          } else {
            handleNext();
          }
          setExitX(0);
        }, 180);
      }
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "h-80 w-full flex items-center justify-center select-none",
          className
        )}
        {...props}
      >
        <div className="relative w-80 sm:w-96 h-72">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex;
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length;
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length;

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 rounded-2xl cursor-grab active:cursor-grabbing",
                  "bg-white dark:bg-[#1C1F1B] border border-[#20231F]/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : isPrevCard ? 0.95 : 0.9,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.7 : 0.4,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                  rotate: isCurrentCard ? exitX / 22 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 24,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-3 flex justify-between px-4 z-20 pointer-events-auto">
                    <button
                      type="button"
                      aria-label="Previous profile"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#FF6747] hover:text-white transition-colors flex items-center justify-center text-sm font-bold text-gray-500 cursor-pointer"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      aria-label="Next profile"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#FF6747] hover:text-white transition-colors flex items-center justify-center text-sm font-bold text-gray-500 cursor-pointer"
                    >
                      &rarr;
                    </button>
                  </div>
                )}

                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-[#FF6747]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#174D3B] border-2 border-white flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E3E879]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#20231F] dark:text-white">
                      {testimonial.name}
                    </h3>
                    {testimonial.role && (
                      <p className="text-[11px] font-mono font-semibold text-[#FF6747] uppercase tracking-wider">
                        {testimonial.role}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#4C514A] dark:text-white/70 leading-relaxed italic line-clamp-3 px-2">
                    "{testimonial.description}"
                  </p>
                </div>

                <div className="px-6 py-2.5 bg-[#FAF8F4] dark:bg-[#151714] border-t border-[#20231F]/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-[#20231F]/60 dark:text-white/60">
                  <span>SWIPE CARD &bull; DRAG</span>
                  <span className="text-[#174D3B] dark:text-[#E3E879] font-bold">ON-FLOOR COACH</span>
                </div>
              </motion.div>
            );
          })}

          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Jump to profile ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all cursor-pointer",
                    index === currentIndex
                      ? "bg-[#FF6747] w-6"
                      : "bg-[#20231F]/20 dark:bg-white/20 hover:bg-[#20231F]/40",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel, type Testimonial };
