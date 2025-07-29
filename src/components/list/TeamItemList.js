import styles from './TeamItemList.module.css'; 
import { useNavigate } from "react-router-dom";

const TeamItemList = ({data, classNameTable, classNameItem, classNameImage}) => {
    const navigate = useNavigate();
    return (
        <div>
            {data.map((item, index) => (
                <ul className={classNameTable ? classNameTable : index === 0 ? styles.header : styles.dafaultTable} key={index}>
                    {Object.values(item).map((value, idx) => 
                        value.includes('png') ? (
                            <img 
                                className={classNameImage ? classNameImage : index === 0 ? styles.transparentImage : styles.defaultImage}
                                onClick={index !== 0 ? () => navigate(`/team/${index}`) : undefined} 
                                src={value} 
                                alt={`Image of ${value}`} 
                                key={idx} 
                            />
                        ) : (
                            <li 
                                className={classNameItem ? classNameItem : index === 0 ? styles.headerItem : styles.dafaultItem}
                                key={idx} 
                                onClick={index !== 0 ? () => navigate(`/team/${index}`) : undefined}
                            >
                                {value}
                            </li>
                        )
                    )}
                </ul>
            ))}
        </div>
    );
}

export default TeamItemList;