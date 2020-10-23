import {useEffect, useState} from "react";
import axios from 'axios';
export const useFetchData =function (url) {
    const [lists, setLists] = useState([]);

    async function getLists() {
        try {
            return await axios.get(url);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLists().then(r => {
            setLists(r.data);
        });
    },[]);
    return lists;
}
