import axios from 'axios'

const SERVER_ADDRESS = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(SERVER_ADDRESS)
}

const create = (newObj) => {
    return axios.post(SERVER_ADDRESS, newObj)
}

const update = (newObj) => {
    return axios.put(`${SERVER_ADDRESS}/${newObj.id}`, newObj)
}

export default {
    getAll: getAll, 
    create: create, 
    update: update 
}