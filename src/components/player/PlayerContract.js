import axios from "axios";
import { useState, useEffect } from "react";
import ItemList from "../list/ItemList";
import styles from "./PlayerContract.module.css"

const PlayerContract = () => {

    //first name, last name, years, cap hit
    const playerArrayHeader = ['Player','Years','Cap Hit'];
    const [playerInfo, setPlayerInfo] = useState([]);
    useEffect(() => {
        const loadPlayerInfo = async () => {
        const response = await axios.get(`http://localhost:8000/api/contract/recent`);
        const contractData = response.data;
        let playerData = [playerArrayHeader];
        for (const contract of contractData){
            if(!playerData[contract.player_id]){
                const response = await axios.get(`http://localhost:8000/api/player/player?player=`+ contract.player_id);
                const newArray = [`${response.data[0].first_name} ${response.data[0].last_name}`, 1, contract.cap_hit];
                playerData[contract.player_id] = newArray;
            }else{
                playerData[contract.player_id][1]++;
                playerData[contract.player_id][2] += contract.cap_hit;
            }
        }
        setPlayerInfo(playerData);
    }
    loadPlayerInfo();
    }, []);
    return(
        <div className= {styles.box}>
            {playerInfo && <ItemList data = {playerInfo}/>}
        </div>
    )
}

export default PlayerContract;