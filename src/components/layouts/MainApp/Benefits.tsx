"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/base";
import { useEffect, useRef } from "react";

const LibraryBenefitsSection2 = () => {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: false, amount: 0.3 });

	const controls = useAnimation();

	useEffect(() => {
		controls.start(isInView ? "visible" : "hidden");
	}, [isInView, controls]);

	const benefits = [
		"Acceso a una gran variedad de recursos, como los catálogos en línea.",
		"Acceso a todos los libros electrónicos de la biblioteca virtual.",
		"Ofrece espacios cómodos y tranquilos para estudiar.",
		"Permite reservar cubículos o salas multimedia para estudiar en grupo.",
		"Permite reservar libros durante un período de tiempo determinado.",
		"Proporciona un entorno propicio para el desarrollo de habilidades de lectura y escritura.",
		"Ofrece asesorías sobre los procedimientos internos de la biblioteca.",
		"Ofrecen capacitaciones para acceder a la biblioteca virtual.",
	];

	const containerVariants = {
		visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
		hidden: { opacity: 0 },
	};

	const itemVariants = {
		visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
		hidden: { opacity: 0, y: 10 },
	};

	return (
		<div ref={containerRef} className="relative w-full bg-white dark:bg-gray-950 overflow-hidden py-12 px-6">
			{/* Gradient overlay elements that blur when out of view */}
			<div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
			<div className="absolute top-1/2 left-3/4 w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000"></div>

			<div className="max-w-7xl mx-auto">
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}>
					{/* Left side - Book image with subtle animations */}
					<motion.div
						className="relative overflow-hidden group"
						whileInView={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.7 }}
						viewport={{ once: true }}>
						<motion.div
							className="relative z-10 rounded-lg overflow-hidden"
							whileHover={{ scale: 1.02 }}
							transition={{ type: "spring", stiffness: 300 }}>
							<motion.div
								animate={{
									boxShadow: [
										"0 10px 30px -15px rgba(0, 0, 0, 0.2)",
										"0 20px 40px -20px rgba(0, 0, 0, 0.4)",
										"0 10px 30px -15px rgba(0, 0, 0, 0.2)",
									],
								}}
								transition={{ duration: 5, repeat: Infinity }}
								className="rounded-lg overflow-hidden">
								<img
									src="/api/placeholder/460/380"
									alt="Libro abierto de la biblioteca APEC"
									className="w-full h-auto object-cover rounded-lg"
								/>
							</motion.div>

							{/* Animated overlay for book image */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg"
								animate={{
									opacity: [0.1, 0.2, 0.1],
									background: [
										"linear-gradient(to top right, rgba(37, 99, 235, 0.2), transparent)",
										"linear-gradient(to top right, rgba(37, 99, 235, 0.3), transparent)",
										"linear-gradient(to top right, rgba(37, 99, 235, 0.2), transparent)",
									],
								}}
								transition={{ duration: 3, repeat: Infinity }}
							/>
						</motion.div>

						{/* Small floating elements */}
						<motion.div
							className="absolute -right-4 top-6 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shadow-lg z-20"
							animate={{
								y: [0, -8, 0],
								transition: { duration: 4, repeat: Infinity },
							}}>
							<BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
						</motion.div>

						<motion.div
							className="absolute bottom-10 -left-4 w-24 h-8 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-white text-xs font-medium shadow-lg z-20"
							animate={{
								x: [0, 5, 0],
								transition: { duration: 3, repeat: Infinity, delay: 1 },
							}}>
							Biblioteca
						</motion.div>
					</motion.div>

					{/* Right side - Benefits list with animated bullet points */}
					<motion.div variants={containerVariants} initial="hidden" animate={controls} className="flex flex-col">
						<motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
							<Badge className="mb-3 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-none">APEC</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">Ventajas de usar la biblioteca de APEC</h2>

							<motion.div
								className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mb-6"
								animate={{
									width: [20, 80, 20],
									transition: { duration: 3, repeat: Infinity },
								}}
							/>
						</motion.div>

						<motion.ul className="space-y-3">
							{benefits.map((benefit, index) => (
								<motion.li
									key={index}
									variants={itemVariants}
									className="flex items-start"
									whileHover={{ x: 5 }}
									transition={{ type: "spring", stiffness: 300 }}>
									<div className="mr-3 mt-1 flex-shrink-0">
										<motion.div
											className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
											whileHover={{ scale: 1.2, backgroundColor: "#3b82f6" }}>
											<ChevronRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
										</motion.div>
									</div>
									<motion.p className="text-gray-700 dark:text-gray-300" whileHover={{ color: "#3b82f6" }}>
										{benefit}
									</motion.p>
								</motion.li>
							))}
						</motion.ul>
					</motion.div>
				</motion.div>
			</div>

			{/* Gradient background that blurs when out of layout/viewport */}
			<div className="absolute inset-0 -z-10 bg-white dark:bg-gray-950 transition-all duration-500">
				<div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')]"></div>
			</div>
		</div>
	);
};

export default LibraryBenefitsSection2;
