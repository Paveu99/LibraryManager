import { Book, Rental } from "../../../../../library-manager-back/types";
import { useReturnBookMutation } from "../../../queries/rentals/useReturnBookMutation";
import React, { useEffect, useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { Button, ListItem, ListItemText, Modal } from "@mui/material";
import styles from './styles.module.scss'
import { useCheckDate } from "../../../hooks/useCheckDate";

type SingleRentProps = {
    el: Rental,
    book: Book
}

export const SingleRent = ({ book, el }: SingleRentProps) => {

    const { mutate, isSuccess, error } = useReturnBookMutation();
    const [open, setOpen] = useState<boolean>(false);
    const [returnMessage, setReturnMessage] = useState<string | null>(null);
    const numOfDays = useCheckDate(el.rental_date, el.status);

    const openModal = () => {
        setOpen(true);
        setReturnMessage(null);
    }

    const closeModal = () => {
        setOpen(false);
        setReturnMessage(null);
    }

    const returnBook = (id: number | undefined) => {
        if (id) mutate(id);
    }

    useEffect(() => {
        if (isSuccess) {
            setReturnMessage('Return successful')
            setTimeout(() => {
                setOpen(false);
            }, 1000)
        }
    }, [isSuccess])

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

    if (!book) return <p>Loading...</p>

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

    return (
        <ListItem style={{ width: "100%", marginBottom: "5px", borderRadius: "5px", backgroundColor: numOfDays > 14 ? 'orange' : '#2C3E50', color: '#F8E8D4' }}>
            <ListItemText
                sx={{
                    '& .MuiListItemText-secondary': {
                        color: '#F8E8D4',
                    },
                }}
                primary={`${book.title} - ${book.author}, ${book.year}`}
                secondary={`Rented: ${el.rental_date.split('T')[0]}${!el.return_date ? '' : ', Returned: ' + el.return_date.split('T')[0]}`}
            />
            <ListItemText
                sx={{ textAlign: "right" }}
                className={el.status !== "overdue" ? el.status === "returned" ? styles.green : undefined : styles.red}
                primary={`${numOfDays > 14 ? 'PAST 14 DAYS MARK' : el.status.toUpperCase()}`}
            />
            {!!el.return_date ? null : <Button sx={{ backgroundColor: "#C9A66B", color: "#2C3E50", marginLeft: "10px" }} className={styles.return} onClick={openModal}>Force return</Button>}
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ModalContent sx={{ width: 450 }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                        Confirmation!!!
                    </h2>
                    <p id="unstyled-modal-description" className="modal-description">
                        Are you sure that you want to return <b>{book.title}</b>?
                    </p>
                    <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
                        <Button className={styles.yesNo} sx={{
                            backgroundColor: "#A88453",
                            color: "#F8E8D4"
                        }} onClick={() => returnBook(el.id)}
                            disabled={returnMessage ? true : false}
                        >Yes</Button>
                        <Button className={styles.yesNo} sx={{
                            backgroundColor: "#A88453",
                            color: "#F8E8D4"
                        }} onClick={closeModal}
                            disabled={returnMessage ? true : false}
                        >No</Button>
                    </div>
                    <div className={styles.actions}>
                        {returnMessage && <p className={styles.success}>{returnMessage}!!!</p>}
                        {error && (
                            <p className={styles.error}>
                                {error?.message || "Logout failed. Please try again."}
                            </p>
                        )}
                    </div>
                </ModalContent>
            </Modal>
        </ListItem>
    )
}