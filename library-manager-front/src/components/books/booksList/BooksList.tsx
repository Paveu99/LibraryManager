import { useState } from "react";
import styles from "./styles.module.scss";
import {
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TablePagination,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SingleElement } from "../singleElement";
import { useGetBooksQuery } from "../../../queries/books/useGetBooksQuery";

export const BooksList = () => {
    const { data, error, isLoading } = useGetBooksQuery();
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    const handleClick = (id: string) => {
        setOpenItemId((prev) => (prev === id ? null : id));
    };

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

    if (isLoading) return <p className="warnings">Loading...</p>;
    if (error) return <p className="warnings">{error.message}</p>;

    return (
        <main className={styles.categoriesContainer}>
            <div>
                <ul>
                    {currentPosts?.map((el, index) => (
                        <div key={el.id}>
                            <ListItemButton
                                style={{ marginBottom: "5px", borderRadius: "5px", backgroundColor: '#2C3E50', color: '#F8E8D4' }}
                                onClick={() => handleClick(el.id as string)}
                            >
                                <ListItemIcon>
                                    {index + 1 + (page * rowsPerPage)}
                                </ListItemIcon>
                                <ListItemText primary={`${el.title} - ${el.author}, ${el.year}`} />
                                {openItemId === el.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse
                                className={styles.collapse}
                                in={openItemId === el.id}
                                timeout="auto"
                                unmountOnExit
                            >
                                <SingleElement book={el} />
                            </Collapse>
                        </div>
                    ))}
                </ul>
            </div>
            <TablePagination
                sx={{ display: "flex", justifyContent: "center" }}
                component="div"
                count={data?.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </main>
    );
};
