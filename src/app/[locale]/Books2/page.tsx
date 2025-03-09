"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Star, Heart, Share2, BookOpen, Clock, ChevronDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/base";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/base";
import { Skeleton } from "@/components/ui/base";
import { Progress } from "@/components/ui/progress";

const DummyBookData = {
  title: "The Midnight Library",
  author: "Matt Haig",
  coverImage: "/placeholders/2.avif",
  rating: 4.2,
  reviewCount: 1872,
  description:
    "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
  genres: ["Fiction", "Fantasy", "Contemporary", "Self-Help"],
  publishDate: "August 13, 2020",
  publisher: "Canongate Books",
  pages: 304,
  reviews: [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      date: "February 2, 2025",
      comment:
        "This book changed my perspective on life and the choices we make. Absolutely brilliant storytelling with profound meaning.",
    },
    {
      id: 2,
      user: "Morgan Smith",
      avatar: "/api/placeholder/40/40",
      rating: 4,
      date: "January 15, 2025",
      comment: "Thought-provoking and beautifully written. I couldn't put it down, though the ending felt a bit rushed.",
    },
  ],
};

const BookProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookData, setBookData] = useState<typeof DummyBookData>({
    title: "",
    author: "",
    coverImage: "",
    rating: 0,
    reviewCount: 0,
    description: "",
    genres: [],
    publishDate: "",
    publisher: "",
    pages: 0,
    reviews: [],
  });
  const [activeTab, setActiveTab] = useState("reviews");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookData(DummyBookData);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Enhanced tab animations
  const tabContentVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      scale: 0.95,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.19, 1.0, 0.22, 1.0], // Easing for smooth animation
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const tabTriggerVariants = {
    inactive: {
      scale: 1,
      color: isDark ? "#9ca3af" : "#6b7280",
      transition: { duration: 0.2 },
    },
    active: {
      scale: 1.05,
      color: isDark ? "#f3f4f6" : "#111827",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const tabIndicatorVariants = {
    reviews: {
      x: "0%",
      width: "33.33%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    details: {
      x: "100%",
      width: "33.33%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    similar: {
      x: "200%",
      width: "33.33%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Custom Tab implementation with animations
  const CustomTabs = () => {
    return (
      <div className="w-full">
        <div className="relative bg-gray-100 dark:bg-gray-800/50 rounded-lg mb-6">
          <div className="grid grid-cols-3 relative z-10">
            {["reviews", "details", "similar"].map((tab) => (
              <motion.button
                key={tab}
                className={`py-3 px-4 text-center relative z-10 focus:outline-none capitalize`}
                variants={tabTriggerVariants}
                animate={activeTab === tab ? "active" : "inactive"}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    layoutId="tabIndicatorLine"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="absolute top-0 left-0 h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            variants={tabIndicatorVariants}
            animate={activeTab}
            initial={false}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="tab-content"
          >
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Reader Reviews</h3>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Write a Review
                  </Button>
                </div>

                <Card className="border-0 bg-gray-50 dark:bg-gray-800/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-6 md:pb-0">
                        <div className="text-5xl font-bold text-gray-800 dark:text-gray-100">{bookData.rating}</div>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(bookData.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : i < bookData.rating
                                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          based on {bookData.reviewCount} reviews
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percentage =
                            Math.round(
                              (rating === 5 ? 56 : rating === 4 ? 28 : rating === 3 ? 12 : rating === 2 ? 3 : 1) * 100
                            ) / 100;
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="flex items-center w-8">
                                <span className="text-sm text-gray-600 dark:text-gray-300">{rating}</span>
                                <Star className="h-3 w-3 ml-1 text-gray-400" />
                              </div>
                              <div className="flex-1 mx-4">
                                <Progress value={percentage} className="h-2" />
                              </div>
                              <div className="w-12 text-right text-sm text-gray-500 dark:text-gray-400">{percentage}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                  {bookData.reviews.map((review, i) => (
                    <motion.div
                      key={review.id}
                      variants={slideUp}
                      custom={i}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">{review.user}</div>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{review.date}</div>
                      </div>
                      <div className="mt-3 text-gray-600 dark:text-gray-300">{review.comment}</div>
                      <div className="mt-4 flex items-center text-sm">
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          <MessageSquare className="h-4 w-4 mr-1" /> Reply
                        </button>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          Was this helpful?
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex justify-center">
                  <Button variant="outline" className="rounded-full">
                    Load More Reviews <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Book Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
                      <p className="font-medium">{bookData.title}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                      <p className="font-medium">{bookData.author}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Publisher</p>
                      <p className="font-medium">{bookData.publisher}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Publication Date</p>
                      <p className="font-medium">{bookData.publishDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pages</p>
                      <p className="font-medium">{bookData.pages}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Genres</p>
                      <p className="font-medium">{bookData.genres.join(", ")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "similar" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.15,
                        duration: 0.5,
                      },
                    }}
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`/api/placeholder/200/${200 + i * 10}`}
                        alt="Similar book cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Similar Book {i + 1}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Author Name</p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book cover skeleton */}
          <div className="md:col-span-1">
            <motion.div initial="initial" animate="animate" variants={pulseAnimation} className="relative">
              <Skeleton className="w-full h-96 md:h-[450px] rounded-lg shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-lg animate-pulse" />
            </motion.div>

            <div className="mt-6 space-y-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <div className="flex space-x-2 mt-4">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Book details skeleton */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4 rounded-md" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded-full mx-0.5" />
                  ))}
                </div>
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>
            </div>

            <div className="space-y-3 mt-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full rounded-md" />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Skeleton className="h-10 w-full rounded-md mb-4" />
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/3 rounded-md" />
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-4 rounded-full mx-0.5" />
                          ))}
                        </div>
                      </div>
                      <Skeleton className="h-4 w-24 rounded-md" />
                    </div>
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full content once loaded
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book cover and quick actions */}
        <div className="md:col-span-1">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={bookData.coverImage}
                alt={bookData.title}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                >
                  <BookOpen className="h-4 w-4 mr-1" /> Preview
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                >
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <motion.button
                variants={slideUp}
                custom={0}
                className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="h-5 w-5" />
                <span>Add to Favorites</span>
              </motion.button>

              <motion.div
                variants={slideUp}
                custom={1}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-4 w-4 mr-1" />
                {bookData.rating}
              </motion.div>
            </div>

            <motion.div variants={slideUp} custom={2} className="flex flex-wrap gap-2">
              {bookData.genres.map((genre, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800"
                >
                  {genre}
                </Badge>
              ))}
            </motion.div>

            <motion.div variants={slideUp} custom={3} className="pt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{bookData.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{bookData.publishDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Publisher:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{bookData.publisher}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Book details and reviews */}
        <div className="md:col-span-2">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1
              variants={slideUp}
              custom={0}
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
            >
              {bookData.title}
            </motion.h1>

            <motion.h2 variants={slideUp} custom={1} className="text-xl text-gray-600 dark:text-gray-300 mt-2">
              by {bookData.author}
            </motion.h2>

            <motion.div variants={slideUp} custom={2} className="flex items-center mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(bookData.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < bookData.rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({bookData.reviewCount} reviews)</span>
            </motion.div>

            <motion.div variants={slideUp} custom={3} className="mt-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{bookData.description}</p>
            </motion.div>

            <motion.div variants={slideUp} custom={4} className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300">
                Read Now
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <BookOpen className="h-4 w-4 mr-2" /> Sample
              </Button>

              <Button
                variant="ghost"
                className="rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Clock className="h-4 w-4 mr-2" /> Add to Reading List
              </Button>
            </motion.div>

            <motion.div variants={slideUp} custom={5} className="mt-10">
              <CustomTabs />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookProfilePage;
