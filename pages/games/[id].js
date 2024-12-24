import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};
const ViewGame = () => {
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
        gameTypeLabel: game.game_type.label,
      });
    });
  }, [id]);
  return (
    <>
      <h1>{currentGame.title}</h1>
      <h3>{currentGame.maker}</h3>
      <p>Game Type: {currentGame.gameTypeLabel}</p>
      <p>Number of players: {currentGame.numberOfPlayers}</p>
      <p>Skill level: {currentGame.skillLevel}</p>
      <Button onClick={() => { router.push(`/games/edit/${id}`); }}>Edit</Button>
    </>
  );
};
export default ViewGame;
