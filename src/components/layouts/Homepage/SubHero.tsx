"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/base";
import { Sparkles } from "lucide-react";

export default function LibraryBenefitsSection() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: false, amount: 0.3 });
	const controls = useAnimation();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	useEffect(() => {
		controls.start(isInView ? "visible" : "hidden");
	}, [isInView, controls]);

	const benefits = [
		{
			id: 1,
			title: "Acceso a una gran variedad de recursos",
			description: "Catálogos en línea y múltiples bases de datos académicas disponibles 24/7.",
			icon: "📚",
		},
		{
			id: 2,
			title: "Biblioteca virtual completa",
			description: "Acceso a todos los libros electrónicos desde cualquier dispositivo.",
			icon: "💻",
		},
		{
			id: 3,
			title: "Espacios cómodos para estudiar",
			description: "Ambientes tranquilos y diseñados para una concentración óptima.",
			icon: "🪑",
		},
		{
			id: 4,
			title: "Reserva de espacios",
			description: "Cubículos o salas multimedia para estudiar en grupo.",
			icon: "🏢",
		},
		{
			id: 5,
			title: "Sistema de reserva de libros",
			description: "Préstamos durante períodos determinados con recordatorios automáticos.",
			icon: "📅",
		},
		{
			id: 6,
			title: "Desarrollo de habilidades",
			description: "Entorno propicio para mejorar capacidades de lectura y escritura.",
			icon: "✍️",
		},
		{
			id: 7,
			title: "Asesorías personalizadas",
			description: "Guía sobre los procedimientos internos de la biblioteca.",
			icon: "👩‍🏫",
		},
		{
			id: 8,
			title: "Capacitaciones virtuales",
			description: "Talleres para acceder y aprovechar la biblioteca virtual.",
			icon: "🖥️",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 12,
			},
		},
	};

	const titleVariants = {
		visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
		hidden: { opacity: 0, x: -20 },
	};

	const floatingAnimation = {
		transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" },
		y: [0, -10, 0],
	};

	// Image parallax effect
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) =>
			setMousePosition({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative overflow-hidden py-16 w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
			{/* Blurred background elements */}
			<div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
			<div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 dark:bg-blue-400 rounded-full blur-3xl opacity-10 animate-pulse delay-700"></div>

			{/* Background grid dots */}
			<div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')]"></div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
				{/* Title section with floating animation */}
				<motion.div className="flex flex-col items-center text-center mb-16" initial="hidden" animate={controls} variants={titleVariants}>
					<motion.div animate={floatingAnimation}>
						<Badge
							variant="outline"
							className="mb-3 px-4 py-1 text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900 dark:border-blue-800">
							<Sparkles className="mr-1 w-4 h-4" /> Biblioteca APEC
						</Badge>
					</motion.div>

					<motion.h2
						className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-300 mb-4"
						style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` }}>
						Ventajas de usar la biblioteca de APEC
					</motion.h2>

					<motion.div
						className="w-24 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mb-6"
						animate={{ width: [40, 96, 40], transition: { duration: 3, repeat: Infinity } }}></motion.div>

					<motion.p
						className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl"
						style={{ transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)` }}>
						Descubre cómo nuestra biblioteca puede potenciar tu desarrollo académico
					</motion.p>
				</motion.div>

				{/* Main content - book image and benefits cards */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
					{/* Left side - Book image with parallax */}
					<motion.div
						className="md:col-span-4 relative"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}>
						<motion.div
							className="relative z-10"
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
							style={{ transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * -10}deg)` }}>
							<div className="relative">
								<motion.img
									src="/api/placeholder/400/500"
									alt="Libro abierto"
									className="w-full h-auto rounded-lg shadow-2xl"
									style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
								/>
								<div className="absolute inset-0 rounded-lg shadow-inner"></div>
								<div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
							</div>

							{/* Floating elements around the book */}
							<motion.div
								className="absolute -right-4 -top-4 w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center text-xl shadow-lg"
								animate={{
									y: [0, -8, 0],
									rotate: [0, 5, 0, -5, 0],
									transition: { duration: 4, repeat: Infinity },
								}}>
								📚
							</motion.div>

							<motion.div
								animate={{ y: [0, 6, 0], x: [0, -3, 0, 3, 0], transition: { duration: 3, repeat: Infinity, delay: 0.5 } }}
								className="absolute -left-6 top-20 w-10 h-10 bg-blue-400 dark:bg-blue-500 rounded-full flex items-center justify-center text-lg shadow-lg">
								🔍
							</motion.div>

							<motion.div
								className="absolute right-10 -bottom-6 w-14 h-14 bg-green-400 dark:bg-green-500 rounded-full flex items-center justify-center text-2xl shadow-lg"
								animate={{ y: [0, 10, 0], rotate: [0, -5, 0, 5, 0], transition: { duration: 5, repeat: Infinity, delay: 1 } }}>
								🎓
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Right side - Benefits cards */}
					<motion.div
						className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
						variants={containerVariants}
						initial="hidden"
						animate={controls}>
						{benefits.map((benefit, index) => (
							<motion.div
								key={benefit.id}
								variants={itemVariants}
								whileHover={{ scale: 1.03, y: -5 }}
								onHoverEnd={() => setHoveredIndex(null)}
								onHoverStart={() => setHoveredIndex(index)}>
								<Card
									className={`h-full overflow-hidden backdrop-blur-sm transition-all duration-300 border-2 ${
										hoveredIndex === index ? "border-blue-400 dark:border-blue-500 shadow-lg" : "border-transparent"
									} 
                  bg-white/90 dark:bg-slate-800/90`}>
									<CardContent className="p-5">
										<div className="flex items-start space-x-4">
											<div className="flex-shrink-0 mt-1">
												<div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xl">
													{benefit.icon}
												</div>
											</div>
											<div>
												<h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-1">{benefit.title}</h3>
												<p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
											</div>
										</div>

										{hoveredIndex === index && (
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: "100%" }}
												transition={{ duration: 0.4 }}
												className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 mt-4 rounded-full"
											/>
										)}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
