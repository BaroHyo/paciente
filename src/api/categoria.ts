import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

type ResponseCategoria = {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
};

type Categoria = {
  codigo: string;
  nombre: string;
  descripcion: string;
};

const fetchCategoria = async (): Promise<ResponseCategoria[]> => {
  const { data } = await api.get("/categorias");
  return data;
};
export const useCategoria = () => {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: fetchCategoria,
    staleTime: 5000,
  });
};

const addCategoria = async (newItem: Categoria): Promise<ResponseCategoria> => {
  const { data } = await api.post("/categorias", newItem);
  return data;
};

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseCategoria, Error, Categoria>({
    mutationFn: addCategoria, // Función de mutación
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

const updateCategoria = async (
  id: number,
  updatedItem: Categoria
): Promise<void> => {
  await api.put(`/categorias/${id}`, updatedItem);
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number; updatedItem: Categoria }>({
    mutationFn: ({ id, updatedItem }) => updateCategoria(id, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/${id}`);
};

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};
