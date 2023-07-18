
import React, {useContext } from 'react';
import User from './Components/User';
import { EcomContext } from './AppProvider';
import NavbarK from './Components/Navbar';

function Home() {


    const{users}=useContext(EcomContext);


    return (
        <>
       <NavbarK/>
       <h1 style={{

        textAlign:'center',
        background: 'linear-gradient(to right, #ff4b1f, #1fddff)',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '48px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#ffffff',
        letterSpacing: '4px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
      }}>Users</h1>
       <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
                gridGap: "10px",
                marginTop:"20px",
                marginLeft:"20px"
                
            }}>
                
                {
                    users.filter((user) => user.deleted === false).map((user, idx) =>
                        <User key={idx} user={user} />)
                }
            </div>
        </>
    )



}


export default Home;