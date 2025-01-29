import { Button, Modal } from "@mui/material";
import { useGetUserRentalsQuery } from "../../../queries/rentals/useGetUserRentalsQuery";
import { useDeleteUserMutation } from "../../../queries/users/useDeleteUserMutation"
import React, { useEffect, useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import styles from './styles.module.scss'

export const DeleteUser = () => {
    const { mutate, isSuccess, error } = useDeleteUserMutation();
    const { data, error: getError, isLoading } = useGetUserRentalsQuery();
    const [open, setOpen] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

    const handleOpen = () => {
        setOpen(true);
        setDeleteMessage(null);
    };
    const handleClose = () => {
        setOpen(false);
        setDeleteMessage(null);
    };

    const deleteUser = () => {
        if (!isSuccess) {
            mutate();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setDeleteMessage('User deleted successfully')
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

    if (!data) {
        return <p>Loading...</p>;
    }

    if (isLoading) return <p className="warnings">Loading...</p>;
    if (getError) return <p className="warnings">{getError.message}</p>;

    return (
        <div>
            <h2>If a user wants to cancel their membership, they need to return all the books!</h2>
            <h3>Canceling a membership is equal to deleting the account. Users will no longer be able to log in!</h3>
            <div style={{ textAlign: "center" }}>
                <small>Button unlocks only when all the books are returned!</small>
                <Button className={styles.deleteUser} sx={{ backgroundColor: "red", color: "white", marginLeft: "10px" }} disabled={data?.filter(el => el.status !== "returned").length > 0 ? true : false} onClick={handleOpen}>Cancel membership</Button>
            </div>
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
                <ModalContent sx={{ width: 650 }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                        Confirmation!!!
                    </h2>
                    <p id="unstyled-modal-description" className="modal-description">
                        Are you sure that you want to cancel your membership? This action will be irreversable!
                    </p>
                    <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
                        <Button className={styles.yesNo} sx={{
                            backgroundColor: "#A88453",
                            color: "#F8E8D4"
                        }} onClick={deleteUser}
                            disabled={deleteMessage ? true : false}
                        >Yes</Button>
                        <Button className={styles.yesNo} sx={{
                            backgroundColor: "#A88453",
                            color: "#F8E8D4"
                        }} onClick={handleClose}
                            disabled={deleteMessage ? true : false}

                        >No</Button>
                    </div>
                    <div className={styles.actions}>
                        {deleteMessage && <p className={styles.success}>{deleteMessage}!!!</p>}
                        {error && (
                            <p className={styles.error}>
                                {error?.message || "Error deleting user"}
                            </p>
                        )}
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
};
