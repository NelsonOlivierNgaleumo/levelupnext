import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
};
const ViewEvent = () => {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleEvent(id).then((event) => {
      setCurrentEvent({
        id: event.id,
        game: event.game.title,
        description: event.description,
        date: event.date,
        time: event.time,
        organizer: event.organizer.id,
      });
    });
  }, [id]);
  return (
    <>
      <h1>{currentEvent.game} Event</h1>
      <h3>{currentEvent.date}</h3>
      <p>Time: {currentEvent.time}</p>
      <p>Description: {currentEvent.description}</p>
      <p>Organized by: User #{currentEvent.organizer}</p>
      <Button onClick={() => { router.push(`/events/edit/${id}`); }}>Edit</Button>
    </>
  );
};
export default ViewEvent;
