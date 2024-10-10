import { useQuery } from "@tanstack/react-query";
import api from "../api/paciente";

interface Categoria {
  Id: number;
  Codigo: string;
  Nombre: string;
  Descripcion: string;
}

async function fetchCategoria(): Promise<Categoria[]> {
  const { data } = await api.get<Categoria[]>("/api/categorias");
  return data;
}

export function useFetchCategoria() {
  return useQuery<Categoria[], Error>({
    queryKey: ["categoria"],
    queryFn: fetchCategoria,
  });
}
