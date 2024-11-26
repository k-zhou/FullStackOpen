import axios from 'axios'

const SERVER_ADDRESS = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(SERVER_ADDRESS)
}

const create = (newObj) => {
    return axios.post(SERVER_ADDRESS, newObj)
}

const update = (newObj, id) => {
    return axios.put(`${SERVER_ADDRESS}/${id}`, newObj).catch(response => `$Error: ${response.data}`)
}

const remove = (id) => {
    return axios.delete(`${SERVER_ADDRESS}/${id}`).catch(response => `$Error: ${response.data}`)
}

export default {
    getAll: getAll, 
    create: create, 
    update: update,
    remove: remove
}