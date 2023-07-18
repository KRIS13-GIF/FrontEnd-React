import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function Post2({ post,id }) {

    function changeStatus(idToSend) {
        
        axios.put(`http://localhost:5002/api/program/changeStatus/${id}/${idToSend}`)
        .then((res)=>{
            console.log("Status Changed")
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
        });
        }

    return (
        <Card style={{
            width: '18rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
            borderRadius: '8px',
            cursor: 'pointer',
            
          }}>
             <FontAwesomeIcon icon={faImage} size="3x"/>
            <Card.Body>
                <Card.Title><b>Title:</b> {post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><b>Address:</b> {post.address}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Status:</b> {post.status}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Username:</b> {post.user.username}</Card.Subtitle>

                <Card.Text>
                    <b>Description:</b> {post.description}
                </Card.Text>
                <Card.Link key={post.id} onClick={() => changeStatus(post.id)}>Change status</Card.Link>

            </Card.Body>
        </Card>
    );



}


export default Post2;