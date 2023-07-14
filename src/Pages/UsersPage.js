
import { useState, useEffect } from "react";

import axios from "axios";
import UserComponentAdmin from "../Components/UserComponentAdmin";
import NavbarK2 from "../Components/Navbar2";



function UserPage(){

    const[users, setUsers]=useState([]);
    

    useEffect(()=>{
        getUsers();
    },[]);


    const getUsers=()=>{

        axios.get(`http://localhost:5002/api/program/showAllUsers`)
        .then((response) => {
            console.log(response);
            setUsers(response.data);
            console.log("data: ", response.data);
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });
};


return(
    
    <div>
        <NavbarK2/>
        {
            users.map((user, idx)=>(
                <UserComponentAdmin key={idx} user={user}></UserComponentAdmin>
            ))
        }
    </div>
)



}


export default UserPage;