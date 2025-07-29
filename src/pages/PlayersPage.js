import axios from "axios";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalContext";
import ItemList from "../components/list/ItemList";
import styles from "./PlayersPage.module.css";

const PlayersPage = () => {
    const [playerInfo, setPlayerInfo] = useState([]);
    const { currentYear, teamsTri } = useGlobalContext();

    const getPlayerInfo = async () => {
        const response = await axios.get(`http://localhost:8000/api/player/caphit?year=${currentYear}&limiter=50`);
        return response.data

    }

    const presentPlayersData = (players) => {
        let playersData = [["Name", "Team", "Position", "Age", "height","Weight","Cap Hit","status"]];
        let player = null;
        for (let i = 0; i < players.length; i++) {
            player = [`${players[i].first_name} ${players[i].last_name}`, `${teamsTri[players[i].team_id]}`, `${players[i].position}`, `${players[i].age}`, `${players[i].height}`, `${players[i].weight}`, `${players[i].cap_hit.toLocaleString()}`, `${players[i].status}`];
            playersData.push(player);
        }
        return playersData;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const players = await getPlayerInfo();
                const playerData = presentPlayersData(players);
                setPlayerInfo(playerData)
            } catch (error) {
                console.error("Error fetching player data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.border}>
            <ItemList data = {playerInfo} />
        </div>
    )
}

export default PlayersPage;