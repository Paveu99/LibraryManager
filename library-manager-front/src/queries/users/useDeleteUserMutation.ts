import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "@tanstack/react-router";
import { useShallow } from "zustand/shallow";

export const useDeleteUserMutation = () => {
    const { apiDelete } = useApi();
    const queryClient = useQueryClient();
    const { id, clear } = useUserStore(useShallow((state) => ({ id: state.id, clear: state.clear })));
    const navigate = useNavigate();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["user"],
        mutationFn: async () => {
            return apiDelete<string>(`user/${id}`, id);
        },
        onSuccess: () => {
            setTimeout(() => {
                clear();
                navigate({ to: '/' });
            }, 1000)

            queryClient.invalidateQueries({ queryKey: ["user"] });
        },

    });

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess,
    };
};
