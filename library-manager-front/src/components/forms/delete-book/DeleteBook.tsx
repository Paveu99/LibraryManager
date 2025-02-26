import { Button } from "@mui/material"
import { Book } from "../../../../../library-manager-back/types"
import { useDeleteBookMutation } from "../../../queries/books/useDeleteBookMutation";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";

type DeleteBookProps = {
    book: Book,
    close: () => void;
}

export const DeleteBook = ({ book, close }: DeleteBookProps) => {

    const { error, isSuccess, mutate } = useDeleteBookMutation(book.id as string)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDelete = () => {
        mutate()
    }

    useEffect(() => {
        if (isSuccess) {
            setSuccessMessage("Successfully deleted!");
            setTimeout(() => {
                setSuccessMessage(null);
                close();
            }, 2000);
        }
    }, [isSuccess]);

    return <>
        <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
            <Button sx={{
                backgroundColor: '#FF0000',
                color: '#F8E8D4',
            }} onClick={handleDelete}
                disabled={successMessage ? true : false}
            >Delete</Button>
            <Button sx={{
                backgroundColor: "#A88453",
                color: "#F8E8D4"
            }} onClick={close}
                disabled={successMessage ? true : false}
            >Cancel</Button>
        </div>
        {error && (
            <p className={styles.error}>{error?.message || "Deleting failed. Please try again."}</p>
        )}

        {successMessage && (
            <p className={styles.success}>{successMessage}</p>
        )}
    </>
}