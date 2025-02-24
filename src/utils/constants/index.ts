export type NavbarMenuItem = {
  description: string;
  image?: string;
  label: string;
  route: string;
};

export type NavbarOption = {
  Type: "pill" | "menu" | "navigator";
  subItems?: Array<NavbarMenuItem>;
  label: string;
  route: string;
};

export const NavbarOptions: Array<NavbarOption> = [];
