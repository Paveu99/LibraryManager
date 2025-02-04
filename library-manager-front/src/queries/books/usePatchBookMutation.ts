import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "../../store/useUserStore";
import { Book, BookDto } from "../../../../library-manager-back/types";

export const usePatchBookMutation = (id: string) => {

    const { userId } = useUserStore(
        useShallow((state) => ({
            userId: state.id,
        }))
    );

    const { apiPatch } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["book", id],
        mutationFn: async (payload: BookDto) => {
            return apiPatch<BookDto, Book>(`book/${id}`, payload, userId)
        },
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });
            }, 2000);
        },
    })

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess,
    }
}
