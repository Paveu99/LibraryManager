import { useShallow } from "zustand/shallow";
import { useUserStore } from "../../../store/useUserStore";
import styles from './styles.module.scss'

export const UserDetails = () => {

    const { firstName, lastName, email, role, libraryCardCode } = useUserStore(useShallow(state => ({ firstName: state.first_name, lastName: state.last_name, email: state.email, role: state.role, libraryCardCode: state.library_card_code })))

    return <div className={styles.container}>
        <p className={styles.desc}>Name: <span className={styles.value}>{firstName}</span></p>
        <p className={styles.desc}>Surname: <span className={styles.value}>{lastName}</span></p>
        <p className={styles.desc}>Email: <span className={styles.value}>{email}</span></p>
        <p className={styles.desc}>Role: <span className={styles.value}>{role[0].toUpperCase() + role.slice(1)}</span></p>
        <p className={styles.desc}>Library card code: <span className={styles.value}>{libraryCardCode}</span></p>
    </div>;
}