import { createData, deleteData, getData, updateData } from "@/api/server";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCrudServer = <T>(endpoint: string, queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const getAll = useQuery({
        queryKey,
        queryFn: () => getData<T>(endpoint),
    });

    const create = useMutation({
        mutationFn: (newItem: Omit<T, "id">) => createData<T>(endpoint, newItem),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    const update = useMutation<void, Error, { id: number; updatedItem: Omit<T, "id"> }>({
        mutationFn: ({ id, updatedItem }) => updateData<T>(endpoint, id, updatedItem),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    const remove = useMutation<void, Error, number>({
        mutationFn: (id: number) => deleteData(endpoint, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return { getAll, create, update, remove };
}

export default useCrudServer;
