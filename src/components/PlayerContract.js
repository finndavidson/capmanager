import styles from "./PlayerContract.module.css"
import axios from "axios";
import { useState, useEffect } from "react";

const PlayerContract = () => {

    //first name, last name, years, cap hit
    const [playerInfo, setPlayerInfo] = useState([]);
    useEffect(() => {
        const loadPlayerInfo = async () => {
        const response = await axios.get(`http://localhost:8000/contract/recent`);
        const contractData = response.data;
        let playerData = [];
        for (const contract of contractData){
            const exists = playerData.some((player) => player[0] === contract.player_id);
            if(!exists){
                const response = await axios.get(`http://localhost:8000/player?player=`+ contract.player_id);
                const newArray = [contract.player_id,response.data[0].first_name, response.data[0].last_name, 1, contract.cap_hit];
                playerData.push(newArray);
            }else{
                const index = playerData.findIndex((player) => player[0] === contract.player_id);
                playerData[index][4] += contract.cap_hit;
            }
        }
        setPlayerInfo(playerData);
    }
    loadPlayerInfo();
    }, []);

    console.log(playerInfo);
    return(
        <div>
            <ul className={styles.table_head}>
                <li className={styles.item}>Player</li>
                <li className={styles.item}> </li>
                <li className={styles.item_center}>Years</li>
                <li className={styles.item_center}>Cap Hit</li>
            </ul>
            {playerInfo.map((player) => {
                    return <ul className={styles.table}>
                        <li className={styles.item_head}>{player[1]}</li>
                        <li className={styles.item}>{player[2]}</li>
                        <li className={styles.item_center}>{player[3]}</li>
                        <li className={styles.item_center}>{player[4]}</li>
                    </ul>
                }
            )}
        </div>
    )
}

export default PlayerContract;