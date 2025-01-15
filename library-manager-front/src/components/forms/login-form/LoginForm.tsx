import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../../queries/users/useLoginUserMutation";
import { Button, Input } from "@mui/material";
import styles from './styles.module.scss'

export type LoginType = {
    library_card_code: string;
    password: string;
};

export const LoginForm = () => {
    const { mutate, isPending, isSuccess, error } = useLoginUserMutation();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<LoginType>({
        mode: "onChange",
        defaultValues: {
            library_card_code: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginType) => {
        mutate(data);
    };

    useEffect(() => {
        if (isSuccess) {
            setSuccessMessage("Successfully logged in!");
            reset();
            setTimeout(() => {
                setSuccessMessage(null);
            }, 1000);
        }
    }, [isSuccess, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            <div>
                <h2 className={styles.inputLabel}>Login Form :</h2>
                <Input
                    id="library_card_code"
                    placeholder="Library card code..."
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '300px',
                        marginTop: '5px'
                    }}
                    type="text"
                    autoComplete="off"
                    {...register("library_card_code", {
                        required: "Library card code is required",
                        minLength: {
                            value: 8,
                            message: "Code must be at least 8 characters long",
                        },
                    })}
                />
                <br />
                {errors.library_card_code && (
                    <small className="error">{errors.library_card_code.message}</small>
                )}
            </div>

            <div>
                <Input
                    id="password"
                    placeholder="Password..."
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '300px',
                        marginTop: '5px'
                    }}
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 3,
                            message: "Password must be at least 3 characters long",
                        },
                    })}
                />
                <br />
                {errors.password && (
                    <small className="error">{errors.password.message}</small>
                )}
            </div>

            <Button
                type="submit"
                disabled={!isValid || isPending}
                className={styles.loginBtn}
                sx={{
                    backgroundColor: "#F8E8D4",
                    color: "#2C3E50"
                }}
            >
                {isPending ? "Logging in..." : "Log in"}
            </Button>
            {error && (
                <p className={styles.error}>
                    {error?.message || "Login failed. Please try again."}
                </p>
            )}
            {successMessage && (
                <p className={styles.success}>{successMessage}</p>
            )}
        </form>
    );
};
