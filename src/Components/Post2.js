import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Post2({ post,id }) {

console.log(id,"params")
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
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.address}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{post.status}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{post.user.username}</Card.Subtitle>

                <Card.Text>
                    {post.description}
                </Card.Text>
                <Card.Link key={post.id} onClick={() => changeStatus(post.id)}>Change status</Card.Link>

            </Card.Body>
        </Card>
    );



}


export default Post2;