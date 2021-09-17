import { useQuery } from "react-query";
import { API_URL } from "../constants";

function useMetaData(id) {

    const getMetaData = async () => {
        const response = await fetch(API_URL + "/api/conversations/" + id,
            {
                method: "GET",
                credentials: "include",
            }
        );

        return await response.json();                
    };

    const { data } = useQuery(
        ["metadata", id],
        getMetaData,
        { refetchOnWindowFocus: false }
    );

    return data ?? {};
}

export default useMetaData;