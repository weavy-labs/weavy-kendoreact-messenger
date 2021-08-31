import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { API_URL } from "../constants";

function useMetaData(id) {


    const getMetaData = async () => {
        const response = await fetch(
            API_URL + "/api/conversations/" + id,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await response.json();        
        return data

    };

    const { isLoading, isError, data, error } = useQuery(
        ["metadata", id],
        getMetaData,
        { refetchOnWindowFocus: false }
    );

    return data ? { id: id, title: data.title } : {};
}

export default useMetaData;