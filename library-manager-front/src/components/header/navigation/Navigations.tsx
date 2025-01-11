import { useShallow } from "zustand/shallow";
import { useUserStore } from "../../../store/useUserStore";
import { Link, useLocation } from "@tanstack/react-router";
import styles from './styles.module.scss';

export const Navigation = () => {

    const { pathname } = useLocation();
    const { role } = useUserStore(useShallow(state => (
        {
            role: state.role,
        })));

    return (
        <div className={styles.stepper}>
            <Link to='/books' className={`${styles.step} ${pathname.startsWith('/books') ? styles.active : ''}`}>Books</Link>
            {
                role === 'admin' && <Link to='/admin' className={`${styles.step} ${pathname.startsWith('/admin') ? styles.active : ''}`}>Admin Panel</Link>
            }
            {
                role === 'client' && <Link to='/user' className={`${styles.step} ${pathname.startsWith('/user') ? styles.active : ''}`}>User Panel</Link>
            }
        </div>
    )
}