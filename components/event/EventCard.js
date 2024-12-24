import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  game,
  description,
  date,
  time,
  organizer,
  onUpdate,
}) => {
  const newDate = new Date(date);
  const router = useRouter();

  const deleteThisEvent = () => {
    if (window.confirm(`Delete the event on ${date}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center" style={{ width: '350px', marginBottom: '10px' }}>
      <Card.Header>{game.title} Event</Card.Header>
      <Card.Body>
        <Card.Title>{newDate.toDateString()} at {(time.slice(0, 2) <= 12 ? time.slice(0, 2) : (time.slice(0, 2) - 12))}{time.slice(2, 5)} {(time.slice(0, 2) <= 11 ? 'am' : 'pm')}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Organized by: User #{organizer.id}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={() => {
            router.push(`/events/${id}`);
          }}
          >View
          </Button>
          <Button onClick={() => {
            router.push(`/events/edit/${id}`);
          }}
          >Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteThisEvent();
            }}
          >Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.shape({
    id: PropTypes.number,
    game_type: PropTypes.shape({
      label: PropTypes.string,
    }),
    title: PropTypes.string,
    maker: PropTypes.string,
    gamer: PropTypes.shape({
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    number_of_player: PropTypes.number,
    skill_level: PropTypes.number,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
