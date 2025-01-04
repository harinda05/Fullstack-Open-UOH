import axios from "axios";
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    console.log('getting all the entries from server')
    return axios.get(baseUrl)
}

const create = async (newObject) => {
    console.log('Creating new phonebook entry')
    const response = await axios.post(baseUrl, newObject);
    return response.data;
}

const deleteEntry = async (id) => {
    console.log(`deleting  phonebook entry ${id}`)
    const response = await axios.delete(`${baseUrl}/${id}`);
    console.log("entry deleted: ", response.data);
    return response.data
}

const update = async (id, newObject) => {
    console.log('updating phonebook entry ', id)
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    console.log("entry updated: ", response.data);
    return response.data
}

export default {
    getAll,
    create,
    deleteEntry,
    update
}