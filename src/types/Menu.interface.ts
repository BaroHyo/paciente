import React from "react";
import { LucideProps } from "lucide-react";

export type NavItem = {
    name: string;
    to: string;
    icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
    tooltip?: string;
}

export type AsideNavProps = {
    items: NavItem[];
}