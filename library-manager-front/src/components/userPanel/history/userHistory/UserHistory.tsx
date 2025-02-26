import { useState } from "react";
import { Book } from "../../../../../../library-manager-back/types";
import { useGetBooksQuery } from "../../../../queries/books/useGetBooksQuery";
import { useGetUserRentalsQuery } from "../../../../queries/rentals/useGetUserRentalsQuery";
import { List, TablePagination } from "@mui/material";
import { SingleHistoryElement } from "../singleHistoryElement/SingleHistoryElement";

export const UserHistory = () => {

    const { data, error: errorRentals, isLoading } = useGetUserRentalsQuery();
    const { data: books, error: errorBooks } = useGetBooksQuery();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastPost = (page + 1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

    if (errorBooks || errorRentals) return <h2>Failed to fetch data!</h2>;

    const findBook = (el: string) => {
        return books?.find(book => book.id === el) as Book
    }

    if (isLoading) return <p className="warnings">Loading...</p>;
    if (errorRentals) return <p className="warnings">{errorRentals}</p>;
    if (errorBooks) return <p className="warnings">{errorBooks}</p>;

    if (data?.length === 0) return <h2>No history for this user!</h2>;

    return <>
        <List style={{ width: "100%" }}>
            {currentPosts?.map((el) => {
                const book = findBook(el.book_id)
                return (
                    <SingleHistoryElement book={book} el={el} key={el.id} />
                )
            })}
        </List>
        <TablePagination
            sx={{ display: "flex", justifyContent: "center" }}
            component="div"
            count={data?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
}