import { Entity, GenericService } from "@/services/GenericService";
import { QueryClient } from "@tanstack/react-query";

export interface ResponseCategoria extends Entity {
  // Ahora extiende Entity
  codigo: string;
  nombre: string;
  descripcion: string;
}

const useCategoriaService = () => {
  const queryClient = new QueryClient();
  const categoriaService = new GenericService<
    ResponseCategoria,
    Omit<ResponseCategoria, "id">
  >(queryClient, "/categorias");

  return {
    useFetchCategorias: () => categoriaService.useFetchEntities(),
    useAddCategoria: () => categoriaService.useAddEntity(),
    useUpdateCategoria: () => categoriaService.useUpdateEntity(),
    useDeleteCategoria: () => categoriaService.useDeleteEntity(),
  };
};

export default useCategoriaService;
