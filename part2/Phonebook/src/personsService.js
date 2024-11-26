import axios from 'axios'

const SERVER_ADDRESS = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(SERVER_ADDRESS)
            .catch(response => console.log(`GET Error: ${response.data}`))
}

const create = (newObj) => {
    return axios
            .post(SERVER_ADDRESS, newObj)
            .catch(response => console.log(`POST Error: ${response.data}`))
}

const update = (newObj, id) => {
    return axios
            .put(`${SERVER_ADDRESS}/${id}`, newObj)
            .catch(response => console.log(`PUT Error: ${response.data}`))
}

const remove = (id) => {
    return axios
            .delete(`${SERVER_ADDRESS}/${id}`)
            .catch(response => console.log(`DELETE Error: ${response.data}`))
}

export default {
    getAll: getAll, 
    create: create, 
    update: update,
    remove: remove
}