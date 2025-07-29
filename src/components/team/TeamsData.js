import axios from "axios";
import { useState, useEffect } from "react";
import TeamItemList from "../list/TeamItemList";

const TeamsData = () => {
    const [teamInfo, setTeamInfo] = useState([]);
    let salaryCap = 279200000;

    const getTeamInfo = async () => {
        let teamData = [];
        const response = await axios.get(`http://localhost:8000/api/team/`);
        teamData = response.data;
        return teamData;
    }

    const getDeadMoney = async (team) => {
        let deadMoney = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < team.length; i++) {
            const response = await axios.get(`http://localhost:8000/api/deadmoney/team?team=` + team[i].team_id);
            response.data.forEach(contract => {
                deadMoney[team[i].team_id - 1] += contract.amount;
            });
        }
        return deadMoney;
    }

    const getPracticeSquad = async (team) => {
        let practiceSquad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < team.length; i++) {
            const response = await axios.get(`http://localhost:8000/api/player/practice?team=` + team[i].team_id);
            response.data.forEach(contract => {
                practiceSquad[team[i].team_id - 1]++;
            });
        }
        return practiceSquad;
    }


    useEffect(() => {
        getTeamInfo().then((teams) => {
            getDeadMoney(teams).then((deadMoney) => {
                getPracticeSquad(teams).then((practiceSquad) => {
                    let teamData = [[`./images/misc/blank_white.png`,'Team', 'Roster Size', 'Cap Hit', 'Cap Space', 'Dead Money', 'Practice Squad']];
                    for (let i = 0; i < teams.length; i++) {
                        teamData[teams[i].team_id] = [`./images/teams/${teams[i].tri_code.toLowerCase()}.png`, teams[i].name, `${teams[i].roster_size}/53`, `${teams[i].cap_hit.toLocaleString()}$`, `${(salaryCap - teams[i].cap_hit - deadMoney[i]).toLocaleString()}$`, `${deadMoney[i].toLocaleString()}$`, `${practiceSquad[i]}/17`];;
                    }
                    setTeamInfo(teamData);
                })
            });
        });
    }, []);

    return (
        <div>
            {teamInfo && <TeamItemList data={teamInfo} />}
        </div>


    )
}

export default TeamsData;