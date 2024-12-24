import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateGame, getGameTypes, getSingleGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};
const UpdateGame = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleGame(id).then((game) => {
      setCurrentGame({
        id: game.id,
        skillLevel: game.skill_level,
        numberOfPlayers: game.number_of_players,
        title: game.title,
        maker: game.maker,
        gameTypeId: game.game_type.id,
      });
    });
  }, [id]);
  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    const game = {
      id: currentGame.id,
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };
    // Send POST request to your API
    updateGame(game).then(() => router.push(`/games/${id}`));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select name="gameTypeId" required value={currentGame.gameTypeId} onChange={handleChange}>
            <option value="">Select a Game Type</option>
            {
              gameTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
UpdateGame.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
export default UpdateGame;
