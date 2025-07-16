// import "jsr:@std/dotenv/load";
import axios from 'axios'

const SERVER_ADDRESS =  process.env.PUBLIC_API_URL || "http://localhost:3001";

const getAll:any = () => {
    return axios
            .get(`${SERVER_ADDRESS}/api/persons`)
            .catch(response => console.log(`GET Error: ${response}`))
}

const create:any = (newObj:object) => {
    return axios
            .post(`${SERVER_ADDRESS}/api/persons`, newObj)
            .catch(response => console.log(`POST Create Error: ${response}`))
}

const update:any = (newObj:object, id:string) => {
    return axios
            .post(`${SERVER_ADDRESS}/api/persons/${id}`, newObj)
            .catch(response => console.log(`POST Update Error: ${response}`))
}

const remove:any = (id:string) => {
    return axios
            .delete(`${SERVER_ADDRESS}/api/persons/${id}`)
            .catch(response => console.log(`DELETE Error: ${response}`))
}

export default {
    getAll: getAll, 
    create: create, 
    update: update,
    remove: remove
}