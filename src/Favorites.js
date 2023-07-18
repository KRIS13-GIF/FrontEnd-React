import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import FavPost from './Components/FavPost';

function Favorites() {
  const params = useParams();
  const [fav, setFav] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/api/program/fav/${params?.id}`)
      .then((response) => {
        setFav(response.data);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, []);



  return (
    <>
      <h1 style={{

        textAlign: 'center',
        background: 'linear-gradient(to right, #ff4b1f, #1fddff)',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '48px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#ffffff',
        letterSpacing: '4px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
      }}>Favorites</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", /* Creates 4 equal columns */
        gridGap: "10px",
        marginTop: "20px",
        marginLeft: "20px"
      }}>{
          fav.map((fav, idx) => <FavPost key={idx} fav={fav}></FavPost>)}
      </div>
    </>
  )
}

export default Favorites;
