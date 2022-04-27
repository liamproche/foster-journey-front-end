import { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';

function CreatePlacementComponent(props) {
  const { user } = useContext(AuthContext)
  const [newPlacement, setNewPlacement] = useState({
    num: "",
    name: "",
    start_date: "",
    end_date: "",
    location: "",
  })
  const submitNewPlacement=()=>{
    props.createNewPlacement({
      ...newPlacement,
      user: user.user_id
    })
  }
  const handleInputChange=(e)=>{
    setNewPlacement({
      ...newPlacement,
      [e.target.name]: e.target.value
    })
  }
  return (
      <div className="CreatePlacementComponent">
          <Form onSubmit={submitNewPlacement}>
            <Form.Group>
              <Form.Label htmlFor="num">Placement Number: </Form.Label>
              <Form.Control type="number" name="num" min="1" required onChange={handleInputChange}></Form.Control>
            </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="name">Placement Name: </Form.Label>
                <Form.Control type="text" name="name" min="1" onChange={handleInputChange}></Form.Control>
              </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="start_date">Start Date</Form.Label>
              <Form.Control type="date" name="start_date" onChange={handleInputChange}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="end_date">End Date</Form.Label>
              <Form.Control type="date" name="end_date" onChange={handleInputChange}></Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Control type="text" name="location" onChange={handleInputChange}></Form.Control>
            </Form.Group>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggleCreateForm}>Close</Button>
                <Button type="submit" variant="primary">Submit</Button>
            </Modal.Footer>
          </Form>
      </div>
    );
}

export default CreatePlacementComponent;