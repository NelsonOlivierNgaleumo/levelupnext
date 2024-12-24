import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateEvent, getSingleEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
};

const UpdateEvent = ({ user }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleEvent(id).then((event) => {
      setCurrentEvent({
        id: event.id,
        game: event.game.id,
        description: event.description,
        date: event.date,
        time: event.time,
        organizer: event.organizer,
      });
    });
  }, [id]);
  useEffect(() => {
    getGames().then(setGames);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    const event = {
      id: currentEvent.id,
      game: currentEvent.game,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      userId: user.uid,
    };
    // Send POST request to your API
    updateEvent(event).then(() => router.push(`/events/${id}`));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select name="game" required value={currentEvent.game} onChange={handleChange}>
            <option value="">Select a Game</option>
            {
              games.map((game) => (
                <option key={game.id} value={game.id}>{game.title}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
UpdateEvent.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
export default UpdateEvent;
