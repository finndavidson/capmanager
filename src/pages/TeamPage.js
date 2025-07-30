import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PlayerItemList from "../components/list/PlayerItemList.js";
import ArrayList from "../components/list/ArrayList.js";
import ItemList from "../components/list/ItemList.js";
import PictureArrayList from "../components/list/PictureArrayList.js";
import styles from "./TeamPage.module.css"
import { useGlobalContext } from "../GlobalContext";

const TeamPage = () => {

    
    const [teamContracts, setTeamContracts] = useState([]);
    const [deadMoney, setDeadMoney] = useState([]);
    const [draftPicks, setDraftPicks] = useState([])
    const [teamInfo, setTeamInfo] = useState([])
    const [teamName, setTeamName] = useState()

    const params = useParams();

    const { currentYear, salaryCap } = useGlobalContext();

    
    const yearsList = ["Name", currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4, currentYear + 5, currentYear + 6, currentYear + 7]
    const roundsList = ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7'];

    //get a teams information based on a given id
    const getTeamInfo = async (team) => {
        const response = await axios.get(`http://localhost:8000/api/team/team?teamID= ${team}`);
        const fetchedTeamData = response.data;
        return fetchedTeamData;
    }

    //get players information for a given team
    const getPlayerInfo = async (team) => {
        const response = await axios.get(`http://localhost:8000/api/player/team?team=` + team[0].team_id);
        const fetchedPlayerData = response.data;
        return fetchedPlayerData;
    }

    //get current year contract information for a given player 
    const getContractInfo = async (players = []) => {
        let contractData = [];
        for (let i = 0; i < players.length; i++) {
            const response = await axios.get(`http://localhost:8000/api/contract/year/after?year=${currentYear}&player=${players[i].player_id}`);
            const fetchedContractData = response.data;
            contractData.push(fetchedContractData);
        }
        return contractData;
    }

    //get all dead money information associated with a given team
    const getDeadMoney = async (team) => {
        const deadMoneyList = [];
        const response = await axios.get(`http://localhost:8000/api/deadmoney/team?team=` + team);
        const fetchedDeadMoneyData = response.data;
        for (const contract of fetchedDeadMoneyData) {
            if (!deadMoneyList[contract.player_id]) {
                deadMoneyList[contract.player_id] = [];
                deadMoneyList[contract.player_id].push(`${contract.player_name}`);
                deadMoneyList[contract.player_id].push(contract.amount);
                deadMoneyList[contract.player_id].push(null);
            }
            else {
                deadMoneyList[contract.player_id][2] = contract.amount;
            }
            console.log(contract);
        }
        return deadMoneyList;
    }

    //get the draft picks controlled by given team for the current year
    const getDraftPicks = async (team) => {
        const response = await axios.get(`http://localhost:8000/api/picks/team/year?team= ${team}&year= ${currentYear}`)
        const picks = response.data;
        return picks;
    }

    //take a double array of data and add values so that all 1d arrays have a length of at least 9
    function normalizeArraysTo9Values(data) {
        const normalizedData = {};
        for (const [key, array] of Object.entries(data)) {
            const normalizedArray = [...array];
            while (normalizedArray.length < 9) {
                normalizedArray.push(null);
            }
            normalizedData[key] = normalizedArray;
        }
        return normalizedData;
    }


    useEffect(() => {
        getTeamInfo(params.teamID).then((team) => {
            const capSpace = salaryCap[0] - team[0].cap_hit
            setTeamName(team[0].name);
            setTeamInfo([[`Cap Hit`, `Cap Space`, `Roster`, `Practice Squad`], [`${team[0].cap_hit.toLocaleString()}`, `${capSpace.toLocaleString()}`, `${team[0].roster_size}/53`, `${team[0].practice_squad}`]]);

            //Collecting all team data for a given team to display all player data data associated with the team
            getPlayerInfo(team).then((players) => {
                getContractInfo(players).then((contracts) => {
                    let teamPlayerData = [yearsList];
                    contracts.flat().forEach((contract) => {
                        if (!teamPlayerData[contract.player_id]) {
                            teamPlayerData[contract.player_id] = [];
                            let playerIndex = players.findIndex(player => player.player_id === contract.player_id);
                            teamPlayerData[contract.player_id].push(`${players[playerIndex].first_name}  ${players[playerIndex].last_name}`)
                        }
                        teamPlayerData[contract.player_id].push(contract.cap_hit.toLocaleString());
                    })
                    teamPlayerData = normalizeArraysTo9Values(teamPlayerData);
                    setTeamContracts(teamPlayerData);
                })
            });

            //getting dead money information for the team
            getDeadMoney(team[0].team_id).then((deadMoneyInfo) => {
                setDeadMoney(deadMoneyInfo);
            })

            //getting draft pick information for the team
            getDraftPicks(team[0].team_id).then((picks) => {
                let teamImage = `/images/teams/${team[0].tri_code.toLowerCase()}.png`;
                const picksArray = [[], [], [], [], [], [], [], []];
                picks.forEach((pick) => {
                    if (pick.team_id === team[0].team_id) {
                        picksArray[pick.round_id] = [...picksArray[pick.round_id], teamImage];
                    }
                    else {
                        getTeamInfo(pick.team_id).then((team) => {
                            picksArray[pick.round_id] = [...picksArray[pick.round_id], `/images/teams/${team[0].tri_code.toLowerCase()}.png`];
                        })
                    }
                })
                picksArray.shift()
                setDraftPicks(picksArray);
            });
        });
    }, [])

    return (
        <div>
            <div className={styles.header}>
                <h1>{teamName}</h1>
                {teamInfo && <ArrayList data={teamInfo[0]} classsNameItem={styles.item} classNameTable={styles.table}/>}
                {teamInfo && <ArrayList data={teamInfo[1]} classsNameItem={styles.item} classNameTable={styles.table}/>}
            </div>
            <h2>Picks</h2>
            <PictureArrayList data={draftPicks} header={roundsList} />
            <div className={styles.outerbox}>
                <h2>Roster</h2>
                {teamContracts && <PlayerItemList data={teamContracts} />}
            </div>
            <div className={styles.outerbox}>
                <h2>Buyouts</h2>
                {deadMoney && <ItemList data={deadMoney} />}
            </div>
        </div>
    );
}

export default TeamPage;