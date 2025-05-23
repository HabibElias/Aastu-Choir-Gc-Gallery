import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useGallery from "./hooks/useGallery";

export default function GalleryPage() {
  const { galleryImages = [] } = useGallery();
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20); // Show 20 images initially
  const [showModal, setShowModal] = useState(false); // For popup
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      // Play with proper error handling
      const playPromise = audioRef.current.play();

      // Handle the play promise properly
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch((error) => {
            // Auto-play was prevented or other error
            console.log("Playback error:", error);
            setIsPlaying(false); // Reset the state if playback fails
          });
      }
    } else if (audioRef.current) {
      // Only pause if not already paused
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Gallery images - replace with your actual choir images

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Audio element for background music */}
      <audio ref={audioRef} loop preload="none">
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden"
          >
            {/* Background animated elements */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-red-600/10"
                  style={{
                    width: Math.random() * 300 + 50,
                    height: Math.random() * 300 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 1.2, 1],
                    opacity: [0, 0.2, 0.1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Sound wave animation */}
            <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center space-x-1 px-4">
              {Array.from({ length: 128 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-600/30"
                  style={{ height: "5%" }}
                  animate={{
                    height: [
                      "5%",
                      `${Math.sin((i / 128) * Math.PI) * 70 + 10}%`,
                      "5%",
                      `${Math.sin((i / 128) * Math.PI * 2) * 40 + 10}%`,
                      "5%",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i / 128,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Main loading content */}
            <div className="relative z-10">
              {/* Vinyl record animation */}
              <motion.div
                className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-900 to-black border-8 border-red-600/20 mb-8 relative mx-auto"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600"></div>
                  <div className="absolute inset-0 border-t-4 border-red-600/30 rounded-full"></div>
                  <div className="absolute inset-[25%] border-t-2 border-red-600/20 rounded-full"></div>
                </div>
              </motion.div>

              {/* Animated text for "AASTU CHOIR 2025 GC" */}
              <motion.div
                className="flex flex-col items-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold text-red-600 mb-4 text-center tracking-tighter"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  AASTU CHOIR
                </motion.h1>

                <motion.div
                  className="text-3xl md:text-4xl font-semibold text-red-500 tracking-[0.3em] relative"
                  initial={{ opacity: 0, letterSpacing: "0.1em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ delay: 1, duration: 1.2 }}
                >
                  <span className="relative">
                    2025 GC
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 2, duration: 0.8 }}
                    />
                  </span>
                </motion.div>
              </motion.div>

              {/* Loading indicator */}
              <motion.div
                className="mt-16 flex space-x-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-3 h-3 rounded-full bg-red-600"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background pattern */}
            <div className="fixed inset-0 z-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.1)_0%,_transparent_70%)]"></div>
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-l border-red-900/20 h-full"
                  ></div>
                ))}
              </div>
              <div className="grid grid-rows-12 w-full absolute top-0 bottom-0">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-t border-red-900/20 w-full"
                  ></div>
                ))}
              </div>
            </div>

            {/* Header */}
            <header className="relative z-10 pt-12 pb-8 px-6">
              <motion.div
                className="max-w-7xl mx-auto"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Center header content */}
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-red-600 flex items-center justify-center">
                    <Music className="w-8 h-8 mr-3 text-red-500" />
                    AASTU CHOIR
                  </h1>
                  {/* Removed play button */}
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
                  <p className="text-xl text-red-500 font-medium px-4">
                    2025 GC
                  </p>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
                </div>
              </motion.div>
            </header>

            {/* Featured image section */}
            <section className="relative z-10 px-6 py-8">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  // Increased height: use min-h-[60vh] and aspect-auto for more vertical space
                  className="relative min-h-[60vh] h-[65vh] aspect-auto overflow-hidden rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.25)] flex items-center justify-center bg-black"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={galleryImages[currentImageIndex]}
                    // Make image fill more of the container
                    className="object-contain w-full h-full max-h-full max-w-full cursor-pointer"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    onClick={() => setShowModal(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="text-white" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    onClick={nextImage}
                  >
                    <ChevronRight className="text-white" />
                  </button>
                  {/* Download button */}
                  <a
                    href={galleryImages[currentImageIndex]}
                    download
                    className="absolute bottom-4 right-4 p-2 rounded-full bg-red-600/80 hover:bg-red-700 transition-colors flex items-center"
                    title="Download Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </section>

            {/* Image Popup Modal */}
            {showModal && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
                onClick={() => setShowModal(false)}
              >
                <div
                  className="relative max-w-3xl w-full mx-4 flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Previous button */}
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-10"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-7 h-7 text-white" />
                  </button>
                  {/* Next button */}
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-10"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    aria-label="Next"
                  >
                    <ChevronRight className="w-7 h-7 text-white" />
                  </button>
                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <img
                    src={galleryImages[currentImageIndex]}
                    className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    alt="Popup"
                  />
                  <a
                    href={galleryImages[currentImageIndex]}
                    download
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-red-600/80 hover:bg-red-700 transition-colors flex items-center"
                    title="Download Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Gallery grid */}
            <section className="relative z-10 px-6 py-8">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  className="text-2xl font-bold text-red-600 mb-8 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="h-px w-8 bg-red-600 mr-4"></span>
                  ALL PHOTOS
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {galleryImages.slice(0, visibleCount).map((image, index) => (
                    <motion.div
                      key={index}
                      className={`relative group overflow-hidden rounded-lg ${
                        index === currentImageIndex ? "ring-2 ring-red-600" : ""
                      }`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5 },
                        },
                      }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setShowModal(true);
                        // Removed scroll to top
                      }}
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={image}
                          className="object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="h-0.5 w-0 bg-red-600 group-hover:w-full transition-all duration-300 mt-1"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {visibleCount < galleryImages.length && (
                  <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <button
                      className="px-8 py-3 bg-red-600/10 border border-red-600/30 text-red-500 font-medium rounded-full hover:bg-red-600/20 transition-all duration-300"
                      onClick={() => setVisibleCount((prev) => prev + 20)}
                    >
                      Load More Photos
                    </button>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 mt-12 border-t border-red-900/20 py-8">
              <div className="max-w-7xl mx-auto px-6 text-center text-red-600/60">
                {/* Added verse */}
                <div className="mb-6 text-base md:text-lg text-red-500/80 leading-relaxed font-semibold">
                  <p>እግዚአብሔር ይባርክህ፥ ይጠብቅህም ፤</p>
                  <p>እግዚአብሔር ፊቱን ያብራልህ፥ ይራራልህም፤</p>
                  <p>እግዚአብሔር ፊቱን ወደ አንተ ያንሣ፥ ሰላምንም ይስጥህ።</p>
                  <p>እንዲሁ ስሜን በእስራኤል ልጆች ላይ ያደርጋሉ፤ እኔም እባርካቸዋለሁ።</p>
                  <p className="mt-4 text-red-600/80">ኦሪት ዘኍልቍ 6 ፤ 24 - 27</p>
                </div>
                <p>© 2025 AASTU CHOIR. All rights reserved.</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
