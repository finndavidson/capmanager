import styles from "./NavBar.module.css"
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul id={styles.bar}>
                <div className={styles.margin}>
                <li id={styles.item}><Link to = '/mock'>Mock Draft</Link></li>
                <li id={styles.item}><Link to = '/team'>Team</Link></li>
                <li id={styles.item}><Link to = '/player'>Player</Link></li>
                <li id={styles.item}><Link to = 'faq'>FAQ</Link></li>
                <li id={styles.item}><Link to = 'tools'>Tools</Link></li>
                </div>
            </ul>
        </nav>
    )
}

export default NavBar;