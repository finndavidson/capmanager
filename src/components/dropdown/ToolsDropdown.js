import styles from "./TeamDropdown.module.css"
import { Link } from "react-router-dom";

const ToolsDropdown = () => {
    return (
        <div className={styles.dropdown}>
            <Link id={styles.item} to='/team'>Tools</Link>
            <div className={styles.dropdown_content}>
                <ul>
                    <li>GM Mode</li>
                    <li>Mock Draft</li>
                </ul>
            </div>
        </div>
    )
}

export default ToolsDropdown;
