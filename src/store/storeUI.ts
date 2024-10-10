import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface NavItem {
    name: string;
    to: string;
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
    tooltip?: string;
    active?: boolean;
}

interface StoreState {
    activeItem: string; // Ruta activa del sidebar
    setActiveItem: (item: string) => void; // Función para cambiar la ruta activa
}

export const useStoreUI = create<StoreState>()(
    devtools(
        persist((set) => ({
            activeItem: 'bienvenido', // valor por defecto
            setActiveItem: (item) => set({ activeItem: item }), // actualizar el estado
        }), {
            name: 'sidebar-storage', // nombre para localStorage 
        })
    )
);

