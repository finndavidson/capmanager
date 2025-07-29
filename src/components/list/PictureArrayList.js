import styles from './PictureArrayList.module.css';

const PictureArrayList = ({ data, header }) => {
    return (

        <div>
            <div>
                <ul className={styles.title_table}>
                    {header.map((item, index) => (
                        <li className={styles.title} key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <ul className={styles.table}>
                {data.map((item) => (
                    <li className={styles.item}>
                        <div className={styles.image_container}>
                            {item.map((pick) => (
                                <span className={styles.circle}>
                                    <img
                                        className={styles.image}
                                        src={pick}
                                        alt="Draft Pick"
                                    />
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PictureArrayList;