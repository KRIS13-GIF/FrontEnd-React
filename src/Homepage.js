
import React, {useContext } from 'react';
import User from './Components/User';
import { EcomContext } from './AppProvider';
import NavbarK from './Components/Navbar';

function Home() {


    const{users}=useContext(EcomContext);


    return (
        <>
       <NavbarK/>
       <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
                gridGap: "10px",
                marginTop:"20px",
                marginLeft:"20px"
                
            }}>
                
                {
                    //.filter((user) => user.deleted === false)
                    users.map((user, idx) =>
                        <User key={idx} user={user} />)
                }
            </div>
        </>
    )



}


export default Home;