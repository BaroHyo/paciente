import api from "@/lib/axios";
import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";

export interface Entity {
  id: number;
}

export interface ApiResponse<T extends Entity> {
  id: number;
  [key: string]: T[keyof T] | number;
}

export class GenericService<T extends Entity, K> {
  private queryClient: QueryClient;
  private endpoint: string;

  constructor(queryClient: QueryClient, endpoint: string) {
    this.queryClient = queryClient;
    this.endpoint = endpoint;
  }

  // Función para obtener todas las entidades
  fetchEntities = async (): Promise<ApiResponse<T>[]> => {
    const { data } = await api.get(this.endpoint);
    return data;
  };

  // Hook para obtener todas las entidades
  useFetchEntities() {
    return useQuery({
      queryKey: [this.endpoint],
      queryFn: this.fetchEntities,
      staleTime: 5000,
    });
  }

  // Función para agregar una nueva entidad
  addEntity = async (newEntity: K): Promise<ApiResponse<T>> => {
    const { data } = await api.post(this.endpoint, newEntity);
    return data;
  };

  // Hook para agregar una nueva entidad
  useAddEntity() {
    return useMutation<ApiResponse<T>, Error, K>({
      mutationFn: this.addEntity,
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: [this.endpoint] });
      },
    });
  }

  // Función para actualizar una entidad
  updateEntity = async (id: number, updatedEntity: K): Promise<void> => {
    await api.put(`${this.endpoint}/${id}`, updatedEntity);
  };

  // Hook para actualizar una entidad
  useUpdateEntity() {
    return useMutation<void, Error, { id: number; updatedEntity: K }>({
      mutationFn: ({ id, updatedEntity }) =>
        this.updateEntity(id, updatedEntity),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: [this.endpoint] });
      },
    });
  }

  // Función para eliminar una entidad
  deleteEntity = async (id: number): Promise<void> => {
    await api.delete(`${this.endpoint}/${id}`);
  };

  // Hook para eliminar una entidad
  useDeleteEntity() {
    return useMutation<void, Error, number>({
      mutationFn: this.deleteEntity,
      onSuccess: () => {
        console.log("Entity deleted, invalidating queries...");
        this.queryClient.invalidateQueries({ queryKey: [this.endpoint] });
      },
      onError: (error) => {
        console.error("Error deleting entity:", error);
      },
    });
  }
}
