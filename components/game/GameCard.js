import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const router = useRouter();

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center" style={{ width: '300px' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        <Card.Text>Skill Level: {skillLevel}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={() => {
            router.push(`/games/${id}`);
          }}
          >View
          </Button>
          <Button onClick={() => {
            router.push(`/games/edit/${id}`);
          }}
          >Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteThisGame();
            }}
          >Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
