import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
    Button,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    TablePagination,
    Tooltip,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SingleElement } from "../singleElement";
import { useGetBooksQuery } from "../../../queries/books/useGetBooksQuery";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { ClearIcon } from "@mui/x-date-pickers/icons";
import { AddBook } from "../../forms";

export const BooksManagement = () => {

    const { data, error, isLoading } = useGetBooksQuery();
    const [openItemId, setOpenItemId] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
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

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const ModalContent = styled('div')(
        ({ theme }) => css`
              font-family: 'IBM Plex Sans', sans-serif;
              font-weight: 500;
              text-align: start;
              position: relative;
              display: flex;
              flex-direction: column;
              gap: 8px;
              overflow: hidden;
              background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
              border-radius: 8px;
              border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
              box-shadow: 0 4px 12px
                ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
              padding: 24px;
              color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
          
              & .modal-title {
                margin: 0;
                line-height: 1.5rem;
                margin-bottom: 8px;
              }
          
              & .modal-description {
                margin: 0;
                line-height: 1.5rem;
                font-weight: 400;
                color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
                margin-bottom: 4px;
              }
            `,
    );

    const Backdrop = React.forwardRef<
        HTMLDivElement,
        { open?: boolean; className: string }
    >((props, ref) => {
        const { open, className, ...other } = props;
        return (
            <div
                className={clsx({ 'base-Backdrop-open': open }, className)}
                ref={ref}
                {...other}
            />
        );
    });

    const StyledBackdrop = styled(Backdrop)`
      z-index: -1;
      position: fixed;
      inset: 0;
      background-color: rgb(0 0 0 / 0.5);
      -webkit-tap-highlight-color: transparent;
    `;

    const indexOfLastPost = (page + 1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

    if (isLoading) return <p className="warnings">Loading...</p>;
    if (error) return <p className="warnings">{error.message}</p>;

    return (
        <main className={styles.categoriesContainer}>
            <Button sx={{
                marginLeft: "40px",
                backgroundColor: '#228B22',
                color: '#F8E8D4'
            }}
                onClick={handleOpen}>Add new book</Button>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ModalContent sx={{ width: 500 }}>
                    <h2 id="unstyled-modal-title" className="modal-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        Add book
                        <Tooltip title="Close">
                            <Button className={styles.logReg} sx={{
                                backgroundColor: '#A88453',
                                color: '#F8E8D4',
                                padding: "0px"
                            }} onClick={handleClose}>
                                <ClearIcon fontSize='large' />
                            </Button>
                        </Tooltip>
                    </h2>
                    <AddBook />
                </ModalContent>
            </Modal>
        </main>
    );
};
