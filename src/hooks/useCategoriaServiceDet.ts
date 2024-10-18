import { Entity, GenericService } from "@/services/GenericService";
import { QueryClient } from "@tanstack/react-query";

export interface ResponseCategoriaDet extends Entity {
  categoriaId: number;
  nombre: string;
  valor: string;
  orden: number;
}

export const useCategoriaServiceDet = () => {
  const queryClient = new QueryClient();

  const categoriaService = new GenericService<
    ResponseCategoriaDet,
    Omit<ResponseCategoriaDet, "id">
  >(queryClient, "/categoria-detalle");

  return {
    useFetchCategoriaDet: () => categoriaService.useFetchEntities(),
    useAddCategoriaDet: () => categoriaService.useAddEntity(),
    useUpdateCategoriaDet: () => categoriaService.useUpdateEntity(),
    useDeleteCategoriaDet: () => categoriaService.useDeleteEntity(),
  };
};

export default useCategoriaServiceDet;
