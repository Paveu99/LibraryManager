import { Navigation } from "../navigation"
import { TopHeader } from "../topHeader"
import styles from './styles.module.scss'

export const MainHeader = () => {
    return <header className={styles.mainHeader}>
        <TopHeader />
        <Navigation />
    </header>
}