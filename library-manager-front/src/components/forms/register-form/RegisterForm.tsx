import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../../queries/users/useRegisterUserMutation";
import { Link } from "@tanstack/react-router";
import { Button, Input } from "@mui/material";
import styles from './styles.module.scss'

export type RegisterType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: "client"
};

export const RegisterForm = () => {
    const { mutate, isPending, isSuccess, error, data } = useRegisterUserMutation();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [libraryCardCode, setLibraryCardCode] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<RegisterType>({
        mode: "onChange",
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "client"
        },
    });

    const onSubmit = (data: RegisterType) => {
        mutate(data);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => alert("Library card code copied to clipboard!"),
            (err) => alert("Failed to copy text: " + err)
        );
    };

    useEffect(() => {
        if (isSuccess && data) {
            setSuccessMessage("Successfully registered!");
            setLibraryCardCode(data.library_card_code);
            reset();
            setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);
        }
    }, [isSuccess, data]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            {
                !libraryCardCode && <>
                    <div>
                        <h2 className={styles.inputLabel}>Register Form :</h2>
                        <Input
                            id="first_name"
                            data-testid='first_name'
                            placeholder="First Name..."
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                padding: '4px',
                                width: '300px',
                                marginTop: '5px'
                            }}
                            type="text"
                            autoComplete="off"
                            {...register("first_name", {
                                required: "First name is required",
                            })}
                        />
                        <br />
                        {errors.first_name && (
                            <small className="error">{errors.first_name.message}</small>
                        )}
                    </div>

                    <div>
                        <Input
                            id="lastName"
                            data-testid='lastName'
                            placeholder="Last Name..."
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                padding: '4px',
                                width: '300px',
                                marginTop: '5px'
                            }}
                            type="text"
                            autoComplete="off"
                            {...register("last_name", {
                                required: "Last name is required",
                            })}
                        />
                        <br />
                        {errors.last_name && (
                            <small className="error">{errors.last_name.message}</small>
                        )}
                    </div>

                    <div>
                        <Input
                            id="email"
                            data-testid='email'
                            placeholder="Email..."
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                padding: '4px',
                                width: '300px',
                                marginTop: '5px'
                            }}
                            type="email"
                            autoComplete="off"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        <br />
                        {errors.email && (
                            <small className="error">{errors.email.message}</small>
                        )}
                    </div>

                    <div>
                        <Input
                            id="password"
                            data-testid='password'
                            placeholder="Password..."
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                padding: '4px',
                                width: '300px',
                                marginTop: '5px'
                            }}
                            type="password"
                            autoComplete="off"
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
                        data-testid='register_user'
                        disabled={!isValid || isPending}
                        className={styles.loginBtn}
                        sx={{
                            backgroundColor: "#F8E8D4",
                            color: "#2C3E50"
                        }}
                    >
                        {isPending ? "Registering..." : "Register"}
                    </Button>
                </>
            }

            {error && (
                <p className={styles.error}>{error?.message || "Registration failed. Please try again."}</p>
            )}

            {successMessage && (
                <p className={styles.success}>{successMessage}</p>
            )}

            {libraryCardCode && (
                <div>
                    <div className="library-card">
                        <strong>Your library card code: </strong>
                        <span>{libraryCardCode}</span>
                        <Button
                            type="button"
                            data-testid="copy_to_clipboard"
                            onClick={() => copyToClipboard(libraryCardCode)}
                            className={styles.loginBtn}
                            sx={{
                                backgroundColor: "#F8E8D4",
                                color: "#2C3E50"
                            }}
                        >
                            Copy to Clipboard
                        </Button>
                    </div>
                    <Link to='/login' className={styles.bttn}><Button className={styles.logReg}>Log in to your account</Button></Link>
                </div>
            )}
        </form>
    );
};