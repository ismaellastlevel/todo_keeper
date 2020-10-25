import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ListCard from './../components/ListCard';
import axios from 'axios';

export default function ListShow() {
    let {listId} = useParams();
    let [loading, setLoading] = useState(true);
    let [listData, setListData] = useState({});

    async function fetchListData(listId) {
        let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
        const url = baseUrl + '/lists/' + listId;
        let response = await axios.get(url);
        return response.data;
    }

    useEffect(() => {
        fetchListData(listId).then(r => {
            setListData(r);
            setLoading(false);
            // console.log(r);
        });
    }, []);

    return (
        loading ? 'loading...' : <ListCard data={listData}/>
    );
}