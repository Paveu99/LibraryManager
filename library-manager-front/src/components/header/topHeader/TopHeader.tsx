import BookIcon from '@mui/icons-material/Book';
import { Button } from '@mui/material';
import { useUserStore } from '../../../store/useUserStore';
import { useShallow } from 'zustand/shallow';
import styles from './styles.module.scss'
import { Link } from '@tanstack/react-router';

export const TopHeader = () => {

    const { role, first_name, last_name, email } = useUserStore(useShallow(state => (
        {
            role: state.role,
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email
        })));

    return <div className={styles.topHeader}>
        <div className={styles.icon}>
            <BookIcon sx={{ fontSize: '70px' }} />
            <Link to='/' className={styles.appName}>Pawel's Library</Link>
        </div>
        {
            role === "guest" ? <div>
                <Button className={styles.logReg}>Log in</Button>
                <Button className={styles.logReg}>Register</Button>
            </div> : <div>
                <p>Test user Name</p>
            </div>
        }
    </div>
}