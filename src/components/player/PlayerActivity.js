import axios from "axios";
import { useState, useEffect } from "react";
import ItemList from "../list/ItemList";
import styles from "./PlayerActivity.module.css";

const PlayerActivity = () => {

    const [playerInfo, setPlayerInfo] = useState([]);
    const playerActivityHeader = ['Player', 'Status'];
    useEffect(() => {
        const loadPlayerInfo = async () => {
            const playerData = [playerActivityHeader]
            const response = await axios.get(`http://localhost:8000/api/player/recent?limiter=5`);
            response.data.forEach(player => {
                playerData[player.player_id] = ([`${player.first_name} ${player.last_name}`,player.status]);
            });
            setPlayerInfo(playerData);
        }
        loadPlayerInfo();
    }, []);
    return(
        <div className={styles.box}>
            {playerInfo && <ItemList data = {playerInfo}/>}
        </div>
    )
}

export default PlayerActivity;