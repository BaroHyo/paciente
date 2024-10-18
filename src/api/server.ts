import api from "@/lib/axios";
import { useErrorStore } from "@/stores/useErrorStore";

const getData = async <T>(endpoint: string): Promise<T[]> => {
    const setError = useErrorStore.getState().setError;
    try {
        const { data } = await api.get<T[]>(endpoint);
        return data;
    } catch (error) {
        setError(`Error al obtener datos de ${endpoint}`);
        console.error(error);
        throw error;
    }
};

const createData = async <T>(endpoint: string, newItem: Omit<T, "id">): Promise<T> => {
    const setError = useErrorStore.getState().setError;
    try {
        const { data } = await api.post<T>(endpoint, newItem);
        return data;
    } catch (error) {
        setError(`Error al crear elemento en ${endpoint}`);
        console.error(error);
        throw error;
    }
};

const updateData = async <T>(endpoint: string, id: number, updatedItem: Omit<T, "id">): Promise<void> => {
    const setError = useErrorStore.getState().setError;
    try {
        await api.put(`${endpoint}/${id}`, updatedItem);
    } catch (error) {
        setError(`Error al actualizar elemento en ${endpoint}/${id}`);
        console.error(error);
        throw error;
    }
};

const deleteData = async (endpoint: string, id: number): Promise<void> => {
    const setError = useErrorStore.getState().setError;
    try {
        await api.delete(`${endpoint}/${id}`);
    } catch (error) {
        setError(`Error al eliminar elemento en ${endpoint}/${id}`);
        console.error(error);
        throw error;
    }
};

export {
    getData,
    createData,
    updateData,
    deleteData
};
