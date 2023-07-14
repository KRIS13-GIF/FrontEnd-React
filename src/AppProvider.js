import { useState, useEffect} from "react";
import React from "react";
import axios from "axios";

export const EcomContext=React.createContext();

const AppProvider=({children})=>{
    

    const [users, setUsers] = useState([]);
   




    useEffect(() => {
        axios
            .get('http://localhost:5002/api/program/showAllUsers')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching favorites:', error);
            });
    }, []);


    return(
        <EcomContext.Provider value={{users, setUsers}}>{children}
        </EcomContext.Provider>
    )

};

export default AppProvider;