import { useForm } from "react-hook-form";
import { Book, BookDto } from "../../../../../library-manager-back/types";
import { Button, TextField } from "@mui/material";
import styles from './styles.module.scss'
import { usePatchBookMutation } from "../../../queries/books/usePatchBookMutation";
import { useEffect, useState } from "react";

type EditBookProps = {
    book: Book
}

export const EditBook = ({ book }: EditBookProps) => {

    const { data, error, isPending, isSuccess, mutate } = usePatchBookMutation(book.id as string)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        reset
    } = useForm<BookDto>({
        mode: "onChange",
        defaultValues: {
            title: book.title,
            author: book.author,
            description: book.description,
            available_copies: book.available_copies,
            total_copies: book.total_copies,
            year: book.year
        },
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = (payload: BookDto) => {
        mutate({
            ...payload,
            total_copies: Number(book.total_copies) - Number(book.available_copies) + Number(payload.available_copies)
        });
    };

    useEffect(() => {
        if (isSuccess && data) {
            setSuccessMessage("Successfully updated!");
            setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);
        }
    }, [isSuccess]);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <TextField
                id="title"
                placeholder="Title..."
                variant="standard"
                label="Title"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '4px',
                    width: '100%',
                    marginTop: '5px'
                }}
                type="text"
                autoComplete="off"
                {...register("title", {
                    required: "Title is required",
                })}
            />
            <br />
            {errors.title && (
                <small className="error">{errors.title.message}</small>
            )}
        </div>

        <div>
            <TextField
                id="author"
                placeholder="Author..."
                variant="standard"
                label="Author"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '4px',
                    width: '100%',
                    marginTop: '5px'
                }}
                type="text"
                autoComplete="off"
                {...register("author", {
                    required: "Author is required",
                })}
            />
            <br />
            {errors.author && (
                <small className="error">{errors.author.message}</small>
            )}
        </div>

        <div>
            <TextField
                id="description"
                placeholder="Description..."
                variant="standard"
                label="Description"
                multiline
                style={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '4px',
                    width: '100%',
                    marginTop: '5px'
                }}
                maxRows={10}
                autoComplete="off"
                {...register("description", {
                    required: "Description is required",
                })}
            />
            <br />
            {errors.description && (
                <small className="error">{errors.description.message}</small>
            )}
        </div>

        <div>
            <TextField
                id="available_copies"
                placeholder="Available copies..."
                variant="standard"
                label="Available copies"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '4px',
                    width: '100%',
                    marginTop: '5px'
                }}
                type="number"
                autoComplete="off"
                {...register("available_copies", {
                    required: "Available copies is required",
                    min: {
                        value: 0,
                        message: "Value can be minimum 0"
                    }
                })}
            />
            <br />
            {errors.available_copies && (
                <small className="error">{errors.available_copies.message}</small>
            )}
        </div>

        <div>
            <TextField
                id="year"
                placeholder="Year..."
                variant="standard"
                label="Year"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '4px',
                    width: '100%',
                    marginTop: '5px'
                }}
                type="number"
                autoComplete="off"
                {...register("year", {
                    required: "Year is required",
                    max: {
                        value: new Date().getFullYear(),
                        message: `Value can be maximum ${new Date().getFullYear()}`
                    }
                })}
            />
            <br />
            {errors.year && (
                <small className="error">{errors.year.message}</small>
            )}
        </div>

        <Button
            type="submit"
            disabled={!isValid || isPending || !isDirty}
            className={styles.loginBtn}
            sx={{
                backgroundColor: "#F8E8D4",
                color: "#2C3E50"
            }}
        >
            {isPending ? "Updating..." : "Update"}
        </Button>

        <Button
            type="button"
            className={styles.loginBtn}
            sx={{
                backgroundColor: "#F8E8D4",
                color: "#2C3E50",
                margin: "5px"
            }}
            onClick={() => reset()}
        >
            Reset
        </Button>

        {error && (
            <p className={styles.error}>{error?.message || "Editing failed. Please try again."}</p>
        )}

        {successMessage && (
            <p className={styles.success}>{successMessage}</p>
        )}
    </form>
}