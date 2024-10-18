import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CategoriaDet {
  id: number;
  categoriaId: number;
  nombre: string;
  valor: string;
  orden: number;
}

export const getItem = async (): Promise<CategoriaDet[]> => {
  const { data } = await api.get("/categoria-detalle");
  return data;
};

export const useAllDemo = () => {
  return useQuery({ queryKey: ["categoria-detalle"], queryFn: getItem });
};

export const createItem = async (
  newItem: Omit<CategoriaDet, "id">
): Promise<CategoriaDet> => {
  const { data } = await api.post("/categoria-detalle", newItem);
  return data;
};

export const useCreateDemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["categoria-detalle"] });
    },
  });
};

const deleteEntity = async (id: number): Promise<void> => {
  await api.delete(`/categoria-detalle/${id}`);
};

export const useDeleteDemo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoria-detalle"] });
    },
  });
};
