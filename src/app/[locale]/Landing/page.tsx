"use client";
import { useState, useEffect, useRef, ComponentType, ReactElement, useMemo, memo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/base";
import { ArrowRight, ChevronDown, Zap, Shield, Users } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import useResponsiveValues from "@/utils/hooks/useResponsiveValues";
import LibraryBenefitsSection2 from "@/components/layouts/MainApp/Benefits";

// Dynamically import navbar to reduce initial bundle size
const AnimatedNavbar = dynamic(() => import("@/components/layouts/MainApp/v5"), {
  ssr: false, // Don't render on server to avoid hydration issues
  loading: () => <div className="h-16 bg-gray-900" />, // Placeholder to prevent layout shift
});

// Higher Order Component for blur effects - optimized
const withBlurEffect = <P extends object>(Component: ComponentType<P>) => {
  return memo(function WithBlurEffectComponent(props: P): ReactElement {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={ref}
        initial={{ filter: "blur(8px)", opacity: 0.6 }}
        animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Component {...props} />
      </motion.div>
    );
  });
};

// Optimized feature item with better event handling
const FeatureItem = memo(({ icon, title, description }: { icon: ReactElement; title: string; description: string }) => (
  <motion.div
    className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="bg-gray-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 text-center">{description}</p>
  </motion.div>
));

// Optimized testimonial item with better typings
const TestimonialItem = memo(
  ({ quote, name, title, avatar }: { quote: string; name: string; title: string; avatar: string }) => (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-6 sm:p-8 border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 sm:mb-6">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg sm:text-xl">
            ★
          </span>
        ))}
      </div>
      <p className="text-base sm:text-lg mb-4 sm:mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 relative mr-3 sm:mr-4">
          <Image src={avatar} alt={name} width={48} height={48} className="rounded-full object-cover" loading="lazy" />
        </div>
        <div>
          <h4 className="font-bold text-sm sm:text-base">{name}</h4>
          <p className="text-xs sm:text-sm text-gray-300">{title}</p>
        </div>
      </div>
    </motion.div>
  )
);

// Completely rebuilt Particles component for better performance
const Particles = memo(({ count, width, height }: { count: number; width: number; height: number }) => {
  // Use canvas for better performance with many particles
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || width === 0 || height === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Create particles only once
    const particles = Array(count)
      .fill(0)
      .map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2 + 1,
      }));

    let animationId: number;

    const animate = () => {
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Simple animation - move particles up slowly
        particle.y -= particle.speed;

        // Reset particles that move off screen
        if (particle.y < 0) {
          particle.y = height;
          particle.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [count, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0" />;
});

// Optimized Hero Section with better rendering patterns
const HeroSection = memo(() => {
  const { isMobile, isTablet, isMounted } = useResponsiveValues();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Mobile-optimized transforms
  const opacityHeader = useTransform(scrollY, [0, 300], [1, 0]);
  const yHeader = useTransform(scrollY, [0, 300], [0, -50]);
  const scaleImage = useTransform(scrollY, [0, 200], [1, 1.1]);
  const yImage = useTransform(scrollY, [0, 200], [0, 30]);
  const blurEffect = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(3px)"]);

  // Optimize mouse move handler with debouncing
  useEffect(() => {
    // Skip mouse tracking on mobile devices to improve performance
    if (isMobile || !isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = clientX / window.innerWidth - 0.5;
        const y = clientY / window.innerHeight - 0.5;
        setMousePosition({ x, y });
      });
    };

    // Passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, isMounted]);

  // Reduce particles on mobile
  const particleCount = isMobile ? 5 : isTablet ? 8 : 10;

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-gray-900 via-indigo-900 to-violet-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Render particles only after mount and if window dimensions are available */}
      {/* {isMounted && <Particles count={particleCount} width={windowSize.width} height={windowSize.height} />} */}

      {/* Simplified gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
        style={
          isMobile || !isMounted
            ? {}
            : {
                backgroundPosition: `${mousePosition.x * 10}px ${mousePosition.y * 10}px`,
              }
        }
      />

      {/* Hero content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text content - with optimized motion transforms */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ opacity: opacityHeader, y: yHeader }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="block">Transforming Ideas</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Into Digital Realities
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Elevate your brand with cutting-edge digital experiences that captivate and convert. Our solutions blend
              innovation with performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size={isMobile ? "default" : "lg"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 rounded-full font-medium text-sm sm:text-base"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <Button
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 rounded-full text-sm sm:text-base"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Hero image - with optimized prop passing */}
          <motion.div
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              filter: blurEffect,
            }}
          >
            <motion.div
              className="relative max-w-md mx-auto lg:max-w-none"
              style={
                isMobile || !isMounted
                  ? {
                      scale: scaleImage,
                      y: yImage,
                    }
                  : {
                      scale: scaleImage,
                      y: yImage,
                      rotateY: mousePosition.x * 5,
                      rotateX: mousePosition.y * -5,
                    }
              }
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              {/* Main hero image with simplified glow effect */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-60" />

                <div className="relative bg-gray-900 rounded-xl sm:rounded-2xl p-2 backdrop-blur-sm border border-white/10">
                  {/* Use Next.js Image component for optimized loading */}
                  <Image
                    src="/placeholders/1.avif"
                    alt="Digital Experience Dashboard"
                    width={800}
                    height={500}
                    priority // Mark as LCP image
                    className="rounded-lg sm:rounded-xl shadow-2xl w-full object-cover h-64 sm:h-80 md:h-96"
                  />

                  {/* Only show floating elements on larger screens */}
                  {!isMobile && isMounted && (
                    <>
                      <motion.div
                        className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-blue-500 rounded-full p-3 sm:p-4 shadow-lg"
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-blue-500 text-lg sm:text-xl font-bold">+</span>
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-purple-500 rounded-lg p-2 sm:p-3 shadow-lg"
                        animate={{
                          y: [0, 8, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-purple-500 text-lg sm:text-xl font-bold">✓</span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - simplified */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

// Optimized Features Section with better rendering patterns
const FeaturesSection = memo(() => {
  // Features data memoized to prevent recreation on re-renders
  const features = useMemo(
    () => [
      {
        icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />,
        title: "Lightning Fast",
        description:
          "Our platform delivers exceptional speed and performance, ensuring your users enjoy a seamless experience.",
      },
      {
        icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500" />,
        title: "Secure & Reliable",
        description:
          "Industry-leading security measures and 99.9% uptime guarantee keeps your data safe and your business running.",
      },
      {
        icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />,
        title: "User-Centric",
        description:
          "Designed with your users in mind, our intuitive interfaces drive engagement and boost conversion rates.",
      },
    ],
    []
  );

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Powerful Features</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why leading companies choose our platform to power their digital transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </div>
  );
});

// Optimized Testimonials Section with better rendering patterns
const TestimonialsSection = memo(() => {
  const { isMobile, isTablet, isMounted } = useResponsiveValues();

  // Testimonials data memoized to prevent recreation on re-renders
  const testimonials = useMemo(
    () => [
      {
        quote:
          "This platform transformed our digital presence completely. The results speak for themselves - 40% increase in conversion rate in just 3 months.",
        name: "Sarah Johnson",
        title: "Marketing Director, TechCorp",
        avatar: "/api/placeholder/64/64",
      },
      {
        quote:
          "The attention to detail and performance optimization is unmatched. Our site load times decreased by 70% after implementation.",
        name: "Michael Chen",
        title: "CTO, InnovateX",
        avatar: "/api/placeholder/64/64",
      },
      {
        quote:
          "Working with this team was a game-changer for our business. Their solutions are both beautiful and functional.",
        name: "Emily Rodriguez",
        title: "CEO, GrowthLabs",
        avatar: "/api/placeholder/64/64",
      },
    ],
    []
  );

  // For mobile and tablet, we can use a simpler layout with fewer testimonials visible at once
  const visibleTestimonials = useMemo(() => {
    if (!isMounted) return [];
    return isMobile ? testimonials.slice(0, 1) : isTablet ? testimonials.slice(0, 2) : testimonials;
  }, [isMobile, isTablet, testimonials, isMounted]);

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What Our Clients Say</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialItem
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              avatar={testimonial.avatar}
            />
          ))}

          {/* Show navigation dots on mobile */}
          {isMobile && isMounted && (
            <div className="flex justify-center mt-4 col-span-1">
              {testimonials.map((_, index) => (
                <div key={index} className={`w-2 h-2 mx-1 rounded-full ${index === 0 ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Optimized Call-to-Action Section with better rendering patterns
const CTASection = memo(() => {
  const { isMobile } = useResponsiveValues();

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Digital Experience?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10">
            Join hundreds of successful businesses that have elevated their online presence with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size={isMobile ? "default" : "lg"}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 rounded-full font-medium text-sm sm:text-base"
            >
              Get Started Today <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 rounded-full text-sm sm:text-base"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Apply the HOC to each section
const HeroSectionWithBlur = withBlurEffect(HeroSection);
const FeaturesSectionWithBlur = withBlurEffect(FeaturesSection);
const TestimonialsSectionWithBlur = withBlurEffect(TestimonialsSection);
const CTASectionWithBlur = withBlurEffect(CTASection);

// Main App Component with TypeScript types
const App = () => {
  return (
    <div className="min-h-screen">
      <HeroSectionWithBlur />
      <AnimatedNavbar />
      <FeaturesSectionWithBlur />
      <TestimonialsSectionWithBlur />
      <CTASectionWithBlur />
      <LibraryBenefitsSection2 />
    </div>
  );
};

export default App;
