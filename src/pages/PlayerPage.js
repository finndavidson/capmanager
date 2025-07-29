import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerContractCard from "../components/player/PlayerContractCard.js";
import PlayerCard from "../components/player/PlayerCard";
import styles from "./PlayerPage.module.css"

const PlayerPage = () => {
    const { playerId } = useParams();
    const [playerInfo, setPlayerInfo] = useState([0]);
    const [contractInfo, setContractInfo] = useState([0]);

    const getPlayerInfo = async () => {
        const response = await axios.get(`http://localhost:8000/api/player/player?player=` + playerId);
        const fetchedPlayerData = response.data;
        return fetchedPlayerData;
    }

    const getContractInfo = async (player = []) => {
        const response = await axios.get(`http://localhost:8000/api/contract?player=` + playerId);
        const fetchedContractData = response.data;
        return fetchedContractData;
    }

    const getTeam = async(team) => {
        const response = await axios.get(`http://localhost:8000/api/team/team?teamID=` + team);
        const fetchedTeam = response.data;
        return fetchedTeam;
    }

    useEffect(() => {
        getPlayerInfo().then((player) => {
            getContractInfo(player).then((contracts) => {
                setPlayerInfo(player);
                getTeam(player[0].team_id).then((team) => {
                    setPlayerInfo(prev => [...prev, { cap_hit: contracts[0].cap_hit, team: team[0].name }])
                    let playerData = [["Base Salary","Guaranteed","Signing Bonus","Roster Bonus","Per Game Roster Bonus", "Workout Bonus", "Cap Hit"]]
                    for (let i = 0; i < contracts.length; i++) {
                        playerData[i+1] = [
                            contracts[i].base_salary != null ? `${contracts[i].base_salary.toLocaleString()}$` : "0$",
                            contracts[i].guaranteed != null ? `${contracts[i].guaranteed.toLocaleString()}$` : "0$",
                            contracts[i].signing_bonus != null ? `${parseInt(contracts[i].signing_bonus,10).toLocaleString()}$` : "0$",
                            contracts[i].roster_bonus != null ? `${parseInt(contracts[i].roster_bonus,10).toLocaleString()}$` : "0$",
                            contracts[i].per_game_roster_bonus != null ? `${parseInt(contracts[i].per_game_roster_bonus,10).toLocaleString()}$` : "0$",
                            contracts[i].workout_bonus != null ? `${parseInt(contracts[i].workout_bonus,10).toLocaleString()}$` : "0$",
                            contracts[i].cap_hit != null ? `${parseInt(contracts[i].cap_hit,10).toLocaleString()}$` : "0$"
                          ];                        
                    }
                    setContractInfo(playerData);
                })

            })
        })
    }, [])
    return (
        <div className={styles.holder}>
            {playerInfo.length > 1 && (
                <PlayerCard player={playerInfo} />
            )}
            {contractInfo && <PlayerContractCard contract = {contractInfo}/>}
        </div>
    );
}

export default PlayerPage;