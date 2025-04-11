"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Clock, BookOpen, User, ChevronLeft } from "lucide-react";
import { Button, Textarea } from "@/components/ui/base";
import Link from "next/link";
import Image from "next/image";

const bookImages = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
  "https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=800",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800",
  "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=800",
];

const reviews = [
  {
    id: 1,
    user: "Alice Johnson",
    rating: 5,
    comment: "This book was absolutely incredible! The character development and plot twists kept me engaged throughout.",
    date: "2024-02-20",
  },
  {
    id: 2,
    user: "Mark Thompson",
    rating: 4,
    comment: "A great read overall. The world-building was fantastic, though the ending felt a bit rushed.",
    date: "2024-02-18",
  },
  {
    id: 3,
    user: "Sarah Chen",
    rating: 5,
    comment: "One of the best books I've read this year. The author's writing style is captivating.",
    date: "2024-02-15",
  },
];

export default async function BookDetails({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = await params;

  const book = {
    id: Number.parseInt(id),
    title: "The Silent Echo",
    author: "Elena Rivers",
    year: 2023,
    genre: "Mystery",
    rating: 4.5,
    pages: 342,
    description:
      "In this gripping mystery novel, Detective Sarah Mitchell uncovers a series of mysterious disappearances in a small coastal town. As she delves deeper into the investigation, she realizes that nothing is as it seems, and the town's peaceful facade hides dark secrets that some would kill to protect. The Silent Echo is a masterfully crafted thriller that will keep you guessing until the very last page.",
  };

  return (
    <div className="min-h-screen bg-dot-pattern">
      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Books
          </Button>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Book Cover */}
          <motion.div
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Image
              src={bookImages[book.id % bookImages.length] || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Book Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground">by {book.author}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{book.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span>{book.pages} pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{book.year}</span>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">About the Book</h2>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold">Reviews</h2>

          {/* Existing Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-6 rounded-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{review.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
                <p className="text-sm text-muted-foreground mt-2">{new Date(review.date).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>

          {/* Add Review Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-card p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(index + 1)}
                    onMouseEnter={() => setHoveredStar(index + 1)}
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        index < (hoveredStar || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              <Textarea
                placeholder="Share your thoughts about this book..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[120px]"
              />
              <Button className="w-full">Submit Review</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
