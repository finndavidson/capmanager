import styles from './ItemList.module.css';

const ItemList = ({ data, classNameTable, classNameItem }) => {
    return (
        <div className={styles.container}>
                {data.map((item, index) => (
                    <ul className={classNameTable ? classNameTable : index === 0 ? styles.header : styles.defaultTable} key={index}>
                        {Object.values(item).map((value, idx) => (
                            <li className={classNameItem ? classNameItem : index === 0 ? styles.headerItem : styles.defaultItem} key={idx}>{value}</li>
                        ))}
                    </ul>
                ))}
        </div>
    );
}

export default ItemList;