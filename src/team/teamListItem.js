const teamListItem = (team) => {
    const [teamInfo, setTeamInfo] = useState([]);
    const loadTeamsInfo = async () => {
        const response = await axios.get(`http://localhost:8000/teams`);
        const teamData = response.data;
        setTeamInfo(teamData);
    }
}

export default teamListItem;