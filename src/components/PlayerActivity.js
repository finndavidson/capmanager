import styles from "./PlayerActivity.module.css"
import axios from "axios";
import { useState, useEffect } from "react";

const PlayerActivity = () => {

    const [playerInfo, setPlayerInfo] = useState([]);
    useEffect(() => {const loadPlayerInfo = async () => {
        const response = await axios.get(`http://localhost:8000/player/status/recent`);
        const playerData = response.data;
        setPlayerInfo(playerData);
    }
    loadPlayerInfo();
    }, []);
    return(
        <div>
            <ul className={styles.table_head}>
                <li className={styles.item}>Player</li>
                <li className={styles.item}> </li>
                <li className={styles.item}>Status</li>
            </ul>
            {playerInfo.map((player) => {
                    return <ul className={styles.table}>
                        <li className={styles.item_head}>{player.first_name}</li>
                        <li className={styles.item}>{player.last_name}</li>
                        <li className={styles.item}>{player.status}</li>
                    </ul>
                }
            )}
        </div>
    )
}

export default PlayerActivity;