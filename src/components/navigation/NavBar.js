import styles from "./NavBar.module.css"
import { Link } from "react-router-dom";
import TeamDropdown from "../dropdown/TeamDropdown";
import ToolsDropdown from "../dropdown/ToolsDropdown";

const NavBar = () => {
    return (
        <nav>
            <ul id={styles.bar}>
                <div className={styles.margin}>
                    <li><Link to='/'><img className = {styles.image} src= {'./images/misc/home.png' } /></Link></li>
                    <TeamDropdown />
                    <li id={styles.item}><Link to='/players'>Players</Link></li>
                    <li id={styles.item}><Link to='faq'>FAQ</Link></li>
                    <ToolsDropdown />
                </div>
            </ul>
        </nav>
    )
}

export default NavBar;