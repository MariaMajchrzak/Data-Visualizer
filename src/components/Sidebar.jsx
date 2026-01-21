import styles from "../styles/Sidebar.module.css"
import {Link} from "react-router-dom";
import menuImg from "../assets/menu.svg";
function Sidebar() {
    return (
        <div className={styles.sidebarContainer}>
            <Link to="/"> <img className={styles.menuImg} src={menuImg} alt="menu img"/> </Link>
        </div>
    );
}

export default Sidebar;
