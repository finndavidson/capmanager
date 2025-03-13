import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PlayerPage.module.css"

const PlayerPage =  () =>{
    const {playerId} = useParams();
    const [playerInfo, setPlayerInfo] = useState([0]);
    const [contractInfo, setContractInfo] = useState([0]);
    const currentYear = 2025;

    const getPlayerInfo = async() =>{
        const response = await axios.get(`http://localhost:8000/player?player=`+ playerId);
        const fetchedPlayerData = response.data;
        return fetchedPlayerData;
    }

    const getContractInfo = async(player =[]) =>{
                const response = await axios.get(`http://localhost:8000/contract/?player=`+ playerId);
                const fetchedContractData = response.data;
                return fetchedContractData;
    }

    useEffect(() =>{
        getPlayerInfo().then((player)=>{
            getContractInfo(player).then((contracts) => {
                setPlayerInfo(player);
                setContractInfo(contracts);
            })
        })
    }, [])

    return(
        <div className= {styles.holder}>
            <img className= {styles.image} src={`/images/players/${playerInfo[0].img_link}.png`} alt={`Image Of ${playerInfo[0].first_name} ${playerInfo[0].last_name}`} />
            <ul className={styles.table}>
                <li className={styles.item_name}>{playerInfo[0].first_name}</li>
                <li className={styles.item_name}>{playerInfo[0].last_name}</li>
            </ul>
            <ul className={styles.table_vertical}>
                <li className={styles.item}>School :{playerInfo[0].school}</li>
                <li className={styles.item}>Position :{playerInfo[0].position}</li>
                <li className={styles.item}>Round :{playerInfo[0].round_picked}</li>
                <li className={styles.item}>Pick :{playerInfo[0].picked}</li>
            </ul>
            {
            contractInfo && contractInfo.map((contracts) => {
                    return <div className={styles.table}>
                        <ul className={styles.table}>
                            <li className={styles.item}>{contracts.cap_hit}</li>
                            <li className={styles.item}>{contracts.year}</li>
                        </ul>                     
                </div>        
            })
            }
        </div>
    );
}

export default PlayerPage;