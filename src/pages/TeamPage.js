import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./TeamPage.module.css";

const TeamPage =  () =>{
    const[teamContracts, setTeamContracts] = useState([]);
    const params = useParams();
    const currentYear = 2025;
    const navigate = useNavigate();

    const getTeamInfo = async() =>{
        const response = await axios.get(`http://localhost:8000/teams/team?tri_code="`+ params.teamID+ '"');
        const fetchedTeamData = response.data;
        return fetchedTeamData;

    }
    const getPlayerInfo = async(team) =>{
        const response = await axios.get(`http://localhost:8000/team/players?team=` + team[0].team_id);
        const fetchedPlayerData = response.data;
        return fetchedPlayerData;
    }

    const getContractInfo = async(players = []) =>{
        let contractData = [];
        for(let i = 0; i<players.length; i++){    
            const response = await axios.get(`http://localhost:8000/contract?player=`+ players[i].player_id);
            const fetchedContractData = response.data;
            contractData.push(fetchedContractData);
        } 
        return contractData;

    }

    useEffect(() =>{
        getTeamInfo().then((team) => {
            getPlayerInfo(team).then((players) => {
                getContractInfo(players).then((contracts) =>{
                    let teamPlayerData = [];
                    contracts.flat().forEach((contract) =>{
                        let caphit = contract.cap_hit;
                        let year = contract.year;
                        let playerInfo = players.findIndex(player => player.player_id === contract.player_id);
                        let playerContractData = []
                        if(playerInfo != -1){
                            playerContractData.push(players[playerInfo].player_id);
                            playerContractData.push(players[playerInfo].first_name);
                            playerContractData.push(players[playerInfo].last_name);
                            playerContractData.push(players[playerInfo].status);
                            playerContractData.push(caphit);
                            playerContractData.push(year);
                            const playerExists = teamPlayerData.findIndex(player => player[0][0] === players[playerInfo].player_id);
                            if(playerExists !== -1){
                                teamPlayerData[playerExists] = [...teamPlayerData[playerExists], playerContractData];
                            }else{
                                teamPlayerData.push([playerContractData]);
                            }                            
                        }
                    })
                    setTeamContracts(teamPlayerData);
                })
            });
        })
    }, [])
    return(
        <div>
            <ul className={styles.table}>
                <li className={styles.item}>Name</li>
                <li className={styles.item}></li>
                <li className={styles.item}>{currentYear}</li>
                <li className={styles.item}>{currentYear+1}</li>
                <li className={styles.item}>{currentYear+2}</li>
                <li className={styles.item}>{currentYear+3}</li>
                <li className={styles.item}>{currentYear+4}</li>
                <li className={styles.item}>{currentYear+5}</li>
                <li className={styles.item}>{currentYear+6}</li>
            </ul>
            {
            teamContracts && teamContracts.map((player) => {
                console.log(player[0][0]);
                    return <div className={styles.table}>
                        <ul className={styles.table}>
                            <li className={styles.item} onClick={() => navigate(`/player/${player[0][0]}`)}>{player[0][1]}</li>
                            <li className={styles.item}>{player[0][2]}</li>
                        </ul>                     
                     {
                        player.map((contract) => {
                             return <ul className={styles.table}>
                                <li className={styles.item}>{contract[4]}</li>
                            </ul>
                    })}
                </div>        
            })
            }
        </div>
    );
}   

export default TeamPage;