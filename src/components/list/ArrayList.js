import styles from './ItemList.module.css'; 

const ArrayList = ({data, classNameTable, classNameItem}) => {
    if(!data){
        data=[]
    }
    return (
        <div>
            <ul className={classNameTable ? classNameTable : styles.defaultTable}>
            {data.map((item, index) => (
               <li className={classNameItem ? classNameItem : styles.defaultItem} key={index}>{item}</li>                
            ))}
            </ul>
        </div>
    );
}

export default ArrayList;