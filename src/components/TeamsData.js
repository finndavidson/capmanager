import styles from "./TeamsData.module.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamsData = () => {
    const [teamInfo, setTeamInfo] = useState([0]);
    let currentYear = 2025;
    let salaryCap = 279200000;
    const navigate = useNavigate();

    const getTeamInfo = async() =>{
        let teamData = [["Team","Roster Size", "Cap Hit"]];
        const response = await axios.get(`http://localhost:8000/teams`);
        teamData = response.data;
        return teamData;
    }

    const getPlayerInfo = async(result = []) =>{
        let playerData = [[]];
        const promises = Promise.all(result.map(async(team) =>{
            return new Promise(async(resolve) =>{
            const response = await axios.get(`http://localhost:8000/team/players?team=`+ team.team_id);
            const fetchedPlayerData = response.data;
            playerData.push(fetchedPlayerData);
            resolve();
            })
        })).then(() =>{
            playerData.splice(0,1);
            return playerData;
        });
        return promises;
    }

    const getContractInfo = async(team = []) =>{
        let teamData = [];
        for(let i = 0; i<team.length; i++){
                let contractData = [];
                for(let j = 0; j<team[i].length; j++){
                    const response = await axios.get(`http://localhost:8000/contract/year?player=`+ team[i][j].player_id+"&year="+currentYear);
                    const fetchedContractData = response.data;
                    contractData.push(fetchedContractData);
                }
                teamData.push(contractData);   
        }
        return teamData;

    }

    useEffect(() => {
        getTeamInfo().then((teams) => {
            getPlayerInfo(teams).then((players) =>{
                getContractInfo(players).then((contracts) => {
                    const modifiedTeamData = teams.map((team) => {
                        return [team.team_id, team.name, team.tri_code];
                    })
                    const rosterSize = players.map((player) => {
                        return [player[0].team_id, player.length];
                    })
                    let capHits = [];
                    for(let i = 0; i<contracts.length; i++){
                        let teamCapHit = 0;
                        for(let j =0; j<contracts[i].length; j++){
                            teamCapHit += contracts[i][j][0].cap_hit; 
                        }
                        capHits.push(teamCapHit);
                    }
                    for(let i = 0; i<capHits.length; i++){
                        let newArray = [modifiedTeamData[i],capHits[i], rosterSize[i][1]];;
                        setTeamInfo((prev) => {
                            if(prev.length < 33){
                            return [...prev, newArray]
                            }
                            else {
                                return prev;
                            }
                        });
                    }
                });
            });
        });
    }, []);
    return (
        <div>
            {teamInfo.map((team) => {
                if(team !== 0){
                    return <ul className={styles.table}>
                        <li className={styles.item} onClick={() => navigate(`/team/${team[0][2]}`)}>{team[0][1]}</li>
                        <li className={styles.item}>{team[2]}/53</li>
                        <li className={styles.item}>{team[1]}$</li>
                        <li className={styles.item}>{salaryCap-team[1]}$</li>
                    </ul>
                }
                else{
                    return <ul className={styles.table_head}>
                        <li className={styles.item}>{"Team"}</li>
                        <li className={styles.item}>{"Roster Size"}</li>
                        <li className={styles.item}>{"Cap Hit"}</li>
                        <li className={styles.item}>{"Cap Space"}</li>
                        <li className={styles.item}>{"Dead Money"}</li>
                        <li className={styles.item}>{"Practice Squad"}</li>
                    </ul>
                }
            })}
        </div>


    )
}

export default TeamsData;