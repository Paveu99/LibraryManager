import { Link, useLocation } from "@tanstack/react-router";
import styles from './styles.module.scss';

export const AdminHeader = () => {
    const { pathname } = useLocation();

    return (
        <div className={styles.stepper}>
            <Link to='/admin/books' className={`${styles.step} ${pathname.startsWith('/admin/books') ? styles.active : ''}`}>Manage Books</Link>
            <Link to='/admin/rentals' className={`${styles.step} ${pathname.startsWith('/admin/rentals') ? styles.active : ''}`}>Manage Rentals</Link>
        </div>
    )
}