import axios from "axios"


export default async function getDefaultAgents() {
    return await axios
        .get('http://api.twon.uni-trier.de/agents/explicit')
        .then(response => response.data)
        .catch(error => error.toString())
}