import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description, //
  date,
  time,

}) => (
  <Card className="text-center">
    <Card.Header>{description}</Card.Header>
    <Card.Body>
      <Card.Title>Description: {description}</Card.Title>
      <Card.Text>{date} date of event</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">time: {time}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default EventCard;
