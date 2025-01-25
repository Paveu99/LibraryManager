import { Link, useLocation } from "@tanstack/react-router";
import styles from './styles.module.scss';

export const UserHeader = () => {
    const { pathname } = useLocation();

    return (
        <div className={styles.stepper}>
            <Link to='/user/details' className={`${styles.step} ${pathname.startsWith('/user/details') ? styles.active : ''}`}>User Details</Link>
            <Link to='/user/rentals' className={`${styles.step} ${pathname.startsWith('/user/rentals') ? styles.active : ''}`}>Your Books</Link>
            <Link to='/user/stats' className={`${styles.step} ${pathname.startsWith('/user/stats') ? styles.active : ''}`}>Statistics</Link>
            <Link to='/user/delete-account' className={`${styles.step} ${pathname.startsWith('/user/delete-account') ? styles.active : ''}`}>Delete Account</Link>
        </div>
    )
}