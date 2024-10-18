// useStore.ts
import { create } from 'zustand';

interface MasterData {
    id: number;
    name: string;
    description: string;
}

interface DetailData {
    id: number;
    detail: string;
}

interface StoreState {
    selectedRow: MasterData | null;
    detailData: DetailData[];
    selectedDetailRow: DetailData | null;
    selectRow: (row: MasterData) => void;
    selectDetailRow: (row: DetailData) => void;
}

export const useStore = create<StoreState>((set) => ({
    selectedRow: null,
    detailData: [],
    selectedDetailRow: null,
    selectRow: (row: MasterData) => {
        const details = [
            { id: 1, detail: `Detail for ${row.name} - 1` },
            { id: 2, detail: `Detail for ${row.name} - 2` },
            { id: 3, detail: `Detail for ${row.name} - 3` },
        ];
        set({ selectedRow: row, detailData: details, selectedDetailRow: null });
    },
    selectDetailRow: (row: DetailData) => set({ selectedDetailRow: row }),
}));
