import styles from './styles.module.scss'
import { Book } from '../../../../../library-manager-back/types';
import { Button, Modal, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { EditBook } from '../../forms/edit-book';
import { ClearIcon } from '@mui/x-date-pickers/icons';
import { DeleteBook } from '../../forms';

type Props = {
    book: Book;
}

export const SingleElement = ({ book }: Props) => {

    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
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

    const isDisabled = book.available_copies < book.total_copies;

    return <div className={styles.collapseContent}>
        <Button className={styles.logReg} sx={{
            backgroundColor: '#A88453',
            color: '#F8E8D4',
            margin: "5px"
        }} onClick={handleOpen}>Edit</Button>

        <Tooltip title="Cannot delete this book!!! At least one copy is rented!!!" disableHoverListener={!isDisabled}>
            <span>
                <Button
                    className={styles.logReg}
                    sx={{
                        backgroundColor: '#FF0000',
                        color: '#F8E8D4',
                        margin: "5px"
                    }}
                    onClick={handleOpen2}
                    disabled={isDisabled}
                >
                    Delete
                </Button>
            </span>
        </Tooltip>
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
                <h2 id="unstyled-modal-title" className="modal-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    Edit book
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
                <EditBook book={book} />
            </ModalContent>
        </Modal>
        <Modal
            open={open2}
            onClose={handleClose2}
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
                    Delete book
                    <Tooltip title="Close">
                        <Button className={styles.logReg} sx={{
                            backgroundColor: '#A88453',
                            color: '#F8E8D4',
                            padding: "0px"
                        }} onClick={handleClose2}>
                            <ClearIcon fontSize='large' />
                        </Button>
                    </Tooltip>
                </h2>
                <p id="unstyled-modal-description" className="modal-description">
                    Are you sure that you want to delete <b>{book.title}</b> by <b>{book.author}</b> from the database?
                </p>
                <DeleteBook book={book} close={() => handleClose2()} />
            </ModalContent>
        </Modal>
    </div>
}