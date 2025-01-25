import styles from './styles.module.scss'
import { Book } from '../../../../../library-manager-back/types';
import { useRentBookMutation } from '../../../queries/rentals/useRentBookMutation';
import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { useUserStore } from '../../../store/useUserStore';
import { useShallow } from 'zustand/shallow';

type Props = {
    book: Book;
}

export const SingleElement = ({ book }: Props) => {

    const { mutate, error, isSuccess } = useRentBookMutation();
    const [open, setOpen] = useState<boolean>(false);
    const [rentMessage, setRentMessage] = useState<string | null>(null);
    const { role } = useUserStore(useShallow(state => ({ role: state.role })));

    const handleClick = () => {
        mutate(book.id as string);
    }

    const handleOpen = () => {
        setOpen(true);
        setRentMessage(null);
    };
    const handleClose = () => {
        setOpen(false);
        setRentMessage(null);
    };

    useEffect(() => {
        if (isSuccess) {
            setRentMessage('Rent successful');
            setTimeout(() => {
                setOpen(false);
                setRentMessage(null);
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

    return <div className={styles.collapseContent}>
        {role === 'client' ? <Button className={styles.logReg} sx={{
            backgroundColor: '#A88453',
            color: '#F8E8D4'
        }} onClick={handleOpen} disabled={book.available_copies < 1}>Rent it</Button> : null}
        <p>
            Title: <b>{book.title}</b>
        </p>
        <p>
            Author: <b>{book.author}</b>
        </p>
        <p>
            Year: <b>{book.year}</b>
        </p>
        <p>
            Description: <b>{book.description}</b>
        </p>
        <p>
            Books available: <b>{book.available_copies}/{book.total_copies}</b>
        </p>
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
                <h2 id="unstyled-modal-title" className="modal-title">
                    Confirmation!!!
                </h2>
                <p id="unstyled-modal-description" className="modal-description">
                    Are you sure that you want to rent <b>{book.title}</b> by <b>{book.author}</b>?
                </p>
                <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
                    <Button className={styles.yesNo} sx={{
                        backgroundColor: "#A88453",
                        color: "#F8E8D4"
                    }} onClick={handleClick}
                        disabled={rentMessage ? true : false}
                    >Rent</Button>
                    <Button className={styles.yesNo} sx={{
                        backgroundColor: "#A88453",
                        color: "#F8E8D4"
                    }} onClick={handleClose}
                        disabled={rentMessage ? true : false}
                    >Cancel</Button>
                </div>
                <div className={styles.actions}>
                    {rentMessage && <p className={styles.success}>{rentMessage}!!!</p>}
                    {error && (
                        <p className={styles.error}>
                            {error?.message || "Renting failed. Please try again."}
                        </p>
                    )}
                </div>
            </ModalContent>
        </Modal>
    </div>
}