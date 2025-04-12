"use client";

import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Button } from "@/components/ui/base";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const ThemeSwitcher = () => {
	const [theme, setTheme] = useState<Theme>("system");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark", "system");
		root.classList.add(theme);

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			root.classList.add(systemTheme);
		}
	}, [theme]);

	const handleThemeChange = (newTheme: Theme) => {
		setTheme(newTheme);
		setIsOpen(false);
	};

	const renderThemeIcon = () => {
		switch (theme) {
			case "light":
				return (
					<span className="w-6 h-6 flex items-center justify-center animate-sun-rise">
						<Sun className="w-5 h-5 text-yellow-500" />
					</span>
				);
			case "dark":
				return (
					<span className="w-6 h-6 flex items-center justify-center animate-moon-drop">
						<Moon className="w-5 h-5 text-gray-400" />
					</span>
				);
			case "system":
				return (
					<span className="w-6 h-6 flex items-center justify-center animate-short-circuit">
						<Monitor className="w-5 h-5 text-gray-600" />
						<span></span> {/* For the screen glow effect */}
					</span>
				);
			default:
				return null;
		}
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					{renderThemeIcon()}
					<span className="text-xs">▼</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48 animate-in slide-in-from-top-2 fade-in-20" align="end">
				<DropdownMenuItem onClick={() => handleThemeChange("light")} className="flex items-center gap-2 cursor-pointer stagger-item">
					<span className="w-6 h-6 flex items-center justify-center animate-sun-rise">
						<Sun className="w-5 h-5 text-yellow-500" />
					</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")} className="flex items-center gap-2 cursor-pointer stagger-item">
					<span className="w-6 h-6 flex items-center justify-center animate-moon-drop">
						<Moon className="w-5 h-5 text-gray-400" />
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeSwitcher;
