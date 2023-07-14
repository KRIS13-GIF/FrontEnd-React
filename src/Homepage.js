
import React, {useContext } from 'react';
import User from './Components/User';
import { EcomContext } from './AppProvider';
import NavbarK from './Components/Navbar';

function Home() {


    const{users}=useContext(EcomContext);


    return (
        <>
       <NavbarK/>
            <div style={{ display: "grid", columngap: "50px" }}>
                {
                    users.filter((user) => user.deleted === false).map((user, idx) =>
                        <User key={idx} user={user} />)
                }
            </div>
        </>
    )



}


export default Home;