import BookIcon from '@mui/icons-material/Book';
import { useUserStore } from '../../../store/useUserStore';
import { useShallow } from 'zustand/shallow';
import styles from './styles.module.scss'
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { useLogoutMutation } from '../../../queries/users/useLogoutUserMutation';


export const TopHeader = () => {

    const { role, first_name, last_name, email, clear } = useUserStore(useShallow(state => (
        {
            role: state.role,
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email,
            clear: state.clear
        })));
    const [open, setOpen] = useState<boolean>(false);
    const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
    const { error, isSuccess, mutate } = useLogoutMutation();
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true);
        setLogoutMessage(null);
    };
    const handleClose = () => {
        setOpen(false);
        setLogoutMessage(null);
    };

    const handleLogOut = () => {
        mutate();
    }

    useEffect(() => {
        if (isSuccess) {
            clear();
            setLogoutMessage('Logout successful')
            setTimeout(() => {
                setOpen(false);
                navigate({
                    to: '/'
                })
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

    return <div className={styles.topHeader}>
        <div className={styles.icon}>
            <BookIcon sx={{ fontSize: '70px' }} />
            <Link to='/' className={styles.appName}>Pawel's Library</Link>
        </div>
        {
            role === "guest" ? <div>
                <Link to='/login' className={styles.bttn} data-testid='log-btn'><Button className={styles.logReg}>Log in</Button></Link>
                <Link to='/register' className={styles.bttn} data-testid='reg-btn'><Button className={styles.logReg}>Register</Button></Link>
            </div> : <div style={{ display: 'flex', justifyContent: "center" }}>
                <div className={styles.userInfo}>
                    <small>{first_name} {last_name}</small>
                    <small style={{ fontStyle: "italic" }}>{email}</small>
                </div>
                <Button className={styles.logReg} onClick={handleOpen}>Log out</Button>
            </div>
        }
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
            <ModalContent sx={{ width: 300 }}>
                <h2 id="unstyled-modal-title" className="modal-title">
                    Confirmation!!!
                </h2>
                <p id="unstyled-modal-description" className="modal-description">
                    Are you sure that you want to log out?
                </p>
                <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
                    <Button className={styles.yesNo} sx={{
                        backgroundColor: "#A88453",
                        color: "#F8E8D4"
                    }} onClick={handleLogOut}
                        disabled={logoutMessage ? true : false}
                    >Yes</Button>
                    <Button className={styles.yesNo} sx={{
                        backgroundColor: "#A88453",
                        color: "#F8E8D4"
                    }} onClick={handleClose}
                        disabled={logoutMessage ? true : false}

                    >No</Button>
                </div>
                <div className={styles.actions}>
                    {logoutMessage && <p className={styles.success}>{logoutMessage}!!!</p>}
                    {error && (
                        <p className={styles.error}>
                            {error?.message || "Logout failed. Please try again."}
                        </p>
                    )}
                </div>
            </ModalContent>
        </Modal>
    </div >
}