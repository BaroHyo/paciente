export interface NavItem {
    name: string;
    to: string;
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
    tooltip?: string;
    active?: boolean;
}
