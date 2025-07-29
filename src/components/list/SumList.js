import ArrayList from "./ArrayList";
import { useEffect, useState } from "react";

const SumList = (list) => {
    const [sumList, setSumList] = useState([0]);

    useEffect(()=>{
        let sum =[]
        if(list.list) {
            for (let i = 1; i < list.list[0].length; i++) {
                sum[i] = 0;
            }
            for (let i = 1; i < list.list.length; i++) {
                for (let j = 0; j < list.list[i].length; j++) {
                    sum[j] += parseInt(list.list[i][j].replace(/\$|,/g, ''), 10);
                }
            }
        }
        for(let i = 0; i<sum.length; i++){
            sum[i] = `${parseInt(sum[i],10).toLocaleString()}$`
        }
        setSumList(sum);
    },[list])
return (
    <ArrayList data={sumList} />
);
}

export default SumList;