"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useImages } from '@/hooks/use-images';

interface Destination {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  cardImage: string;
}

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const { images } = useImages();

  const destinations: Destination[] = [
    {
      id: 1,
      title: "NORAVANK",
      description:
        "Discover the 13th-century Noravank monastery, a masterpiece of medieval Armenian architecture nestled in a narrow gorge. Marvel at its stunning red cliffs and intricate stone carvings that tell stories of Armenia's rich spiritual heritage.",
      backgroundImage: images.heroNoravank,
      cardImage: images.tourNoravank,
    },
    {
      id: 2,
      title: "GARNI TEMPLE",
      description:
        "Experience the only standing Greco-Roman colonnaded building in Armenia, the Temple of Garni. Built in the 1st century AD, this pagan temple stands as a symbol of Armenia's classical heritage, offering breathtaking views of the Azat River Gorge.",
      backgroundImage: images.heroGarni,
      cardImage: images.tourGarni,
    },
    {
      id: 3,
      title: "LAKE SEVAN",
      description:
        "Explore the jewel of Armenia's natural beauty, Lake Sevan. This stunning alpine lake, one of the largest freshwater high-altitude lakes in the world, is surrounded by ancient monasteries and offers spectacular views of the Armenian highlands.",
      backgroundImage: images.heroSevan,
      cardImage: images.tourSevan,
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + destinations.length) % destinations.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${destinations[currentIndex].backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative h-full w-full">
            {/* Progress Bar */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4">
              {destinations.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-12 w-12 rounded-full border-2",
                    index === currentIndex ? "border-white bg-white/20" : "border-white/50"
                  )}
                >
                  <span className="sr-only">Slide {index + 1}</span>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="grid h-full grid-cols-1 lg:grid-cols-2">
              {/* Text Content */}
              <div className="flex items-center p-8 lg:p-16">
                <div className="space-y-8">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold text-white lg:text-8xl"
                  >
                    {destinations[currentIndex].title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xl text-lg text-white/80"
                  >
                    {destinations[currentIndex].description}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-white/90"
                  >
                    Explore
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Cards Carousel */}
              <div className="relative hidden lg:flex">
                <div className="absolute right-16 top-1/2 flex -translate-y-1/2 gap-4">
                  {[-1, 0, 1].map((offset) => {
                    const index = (currentIndex + offset + destinations.length) % destinations.length;
                    return (
                      <motion.div
                        key={destinations[index].id}
                        initial={{ opacity: 0, x: offset * 50 }}
                        animate={{
                          opacity: offset === 0 ? 1 : 0.5,
                          x: offset * 320,
                          scale: offset === 0 ? 1 : 0.9,
                          zIndex: offset === 0 ? 1 : 0
                        }}
                        transition={{ duration: 0.4 }}
                        className="relative aspect-[3/4] w-72 overflow-hidden rounded-xl bg-black"
                      >
                        <img
                          src={destinations[index].cardImage}
                          alt={destinations[index].title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-md">
                          <Bookmark className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-center gap-1">
                            {[...Array(destinations.length)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  i === currentIndex ? "bg-white" : "bg-white/50"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              <button
                onClick={() => paginate(-1)}
                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-sm font-medium text-white">
                {String(currentIndex + 1).padStart(2, "0")}/{String(destinations.length).padStart(2, "0")}
              </div>
              <button
                onClick={() => paginate(1)}
                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
