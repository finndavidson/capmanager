import styles from './ItemList.module.css';
import { useNavigate } from "react-router-dom";

const PlayerItemList = ({ data, classNameTable, classNameItem }) => {
    const navigate = useNavigate();
    
    return (
        <div className={styles.container}>
            {Object.entries(data).map((item, index) => (
                <ul className={classNameTable ? classNameTable : index === 0 ? styles.header : styles.defaultTable} key={index}>
                    {Object.values(item[1]).map((value, idx) => (
                        <li className={classNameItem ? classNameItem : index === 0 ? styles.headerItem : styles.defaultItem} key={idx} onClick={() => navigate(`/player/${item[0]}`)}>{value}</li>
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default PlayerItemList;