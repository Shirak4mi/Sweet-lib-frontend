import LibraryBenefitsSection from "@/components/layouts/Homepage/SubHero";
import LibraryBenefitsSection2 from "@/components/layouts/MainApp/Benefits";
import Switch2 from "@/components/ui/dmt2";
import ThemeSwitcherDMT3 from "@/components/ui/dmt3";
import ThemeToggle from "@/components/ui/dmToggle";
import { type ReactNode } from "react";

export default function HomePage(): ReactNode {
	return (
		<div className="mt-24">
			<LibraryBenefitsSection2 />
		</div>
	);
}
