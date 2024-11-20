"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Bookmark, Globe } from "lucide-react";
import { useImages } from "@/hooks/use-images";

// Simple utility function to replace cn from @/lib/utils
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface Location {
  id: number;
  country: string;
  place: string;
  description: string;
  backgroundImage: string;
  rating: number;
  subLocations: {
    name: string;
    image: string;
    rating: number;
  }[];
}

const locations: Location[] = [
  {
    id: 1,
    country: "ARMENIA",
    place: "Noravank",
    description: "Discover the 13th-century Noravank monastery, a masterpiece of medieval Armenian architecture nestled in a narrow gorge. Marvel at its stunning red cliffs and intricate stone carvings that tell stories of Armenia's rich spiritual heritage.",
    backgroundImage: "/images/hero/noravank-bg.jpg",
    rating: 5,
    subLocations: [
      { name: "Garni Temple", image: "/images/tours/garni.jpg", rating: 5 },
      { name: "Lake Sevan", image: "/images/tours/sevan.jpg", rating: 5 },
      { name: "Tatev Monastery", image: "/images/tours/tatev.jpg", rating: 5 }
    ]
  },
  {
    id: 2,
    country: "ARMENIA",
    place: "Garni Temple",
    description: "Experience the only standing Greco-Roman colonnaded building in Armenia, the Temple of Garni. Built in the 1st century AD, this pagan temple stands as a symbol of Armenia's classical heritage, offering breathtaking views of the Azat River Gorge.",
    backgroundImage: "/images/hero/garni-bg.jpg",
    rating: 5,
    subLocations: [
      { name: "Noravank Monastery", image: "/images/tours/noravank.jpg", rating: 5 },
      { name: "Tatev Monastery", image: "/images/tours/tatev.jpg", rating: 5 },
      { name: "Lake Sevan", image: "/images/tours/sevan.jpg", rating: 5 }
    ]
  },
  {
    id: 3,
    country: "ARMENIA",
    place: "Lake Sevan",
    description: "Explore the jewel of Armenia's natural beauty, Lake Sevan. This stunning alpine lake, one of the largest freshwater high-altitude lakes in the world, is surrounded by ancient monasteries and offers spectacular views of the Armenian highlands.",
    backgroundImage: "/images/hero/sevan-bg.jpg",
    rating: 5,
    subLocations: [
      { name: "Noravank Monastery", image: "/images/tours/noravank.jpg", rating: 5 },
      { name: "Garni Temple", image: "/images/tours/garni.jpg", rating: 5 },
      { name: "Tatev Monastery", image: "/images/tours/tatev.jpg", rating: 5 }
    ]
  }
];

export function HeroSlider() {
  const { images } = useImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Memoize the updated locations to prevent unnecessary recalculations
  const updatedLocations = useMemo(() => {
    return locations.map(location => {
      let bgImage = location.backgroundImage;
      if (location.place === "Noravank") {
        bgImage = images.heroNoravank;
      } else if (location.place === "Garni Temple") {
        bgImage = images.heroGarni;
      } else if (location.place === "Lake Sevan") {
        bgImage = images.heroSevan;
      }
      
      const updatedSubLocations = location.subLocations.map(subLoc => ({
        ...subLoc,
        image: subLoc.name.toLowerCase().includes('noravank') ? images.tourNoravank :
               subLoc.name.toLowerCase().includes('garni') ? images.tourGarni :
               subLoc.name.toLowerCase().includes('sevan') ? images.tourSevan :
               subLoc.name.toLowerCase().includes('tatev') ? images.tourTatev :
               subLoc.image
      }));

      return {
        ...location,
        backgroundImage: bgImage,
        subLocations: updatedSubLocations
      };
    });
  }, [images]);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % updatedLocations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [updatedLocations.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      filter: "blur(12px)",
      scale: 1.1
    }),
    center: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1
    },
    exit: (direction: number) => ({
      opacity: 0,
      filter: "blur(12px)",
      scale: 0.9
    })
  };

  const locationCardVariants = {
    initial: { opacity: 0, x: 100 },
    animate: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.2 }
    }),
    exit: { opacity: 0, x: -100 }
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + updatedLocations.length) % updatedLocations.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Progress Bar */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-6">
        {updatedLocations.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              const newDirection = index > currentIndex ? 1 : -1;
              setDirection(newDirection);
              setCurrentIndex(index);
            }}
            className={classNames(
              "w-12 h-12 rounded-full border-2 transition-all duration-300 relative",
              index === currentIndex
                ? "border-white bg-white/30"
                : "border-white/50 hover:border-white/80"
            )}
            whileHover={{ scale: 1.1 }}
          >
            <span className="absolute -right-8 text-white/80 text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8 },
            filter: { duration: 0.8 },
            scale: { duration: 0.8 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${updatedLocations[currentIndex].backgroundImage})`
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/40"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(0px)" }}
              exit={{ backdropFilter: "blur(4px)" }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="relative h-full w-full px-16 py-8">
            {/* Main Content */}
            <div className="mt-32 max-w-2xl lg:ml-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 mb-4"
              >
                <Globe className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-lg">{updatedLocations[currentIndex].place}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-8xl font-bold text-white mb-6"
              >
                {updatedLocations[currentIndex].country}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                {updatedLocations[currentIndex].description}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Explore</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Location Cards */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col space-y-6">
              {updatedLocations[currentIndex].subLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  custom={index}
                  variants={locationCardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative w-72 overflow-hidden rounded-xl"
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                      <Bookmark className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-medium">{location.name}</h3>
                    <div className="flex space-x-1 mt-1">
                      {Array.from({ length: location.rating }).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
