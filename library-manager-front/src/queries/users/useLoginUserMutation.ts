import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { useUserStore } from "../../store/useUserStore";
import { User } from "../../../../library-manager-back/types";
import { LoginType } from "../../components/forms";
import { useNavigate } from "@tanstack/react-router";

export const useLoginUserMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();
    const setUserData = useUserStore((state) => state.setUserData);
    const navigate = useNavigate();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (payload: LoginType) => {
            return apiPost<User, LoginType>(`user/login`, payload);
        },
        onSuccess: (data: User) => {
            setTimeout(() => {
                setUserData({
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    role: data.role
                });
                navigate({
                    to: '/'
                });
            }, 1000);

            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
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
