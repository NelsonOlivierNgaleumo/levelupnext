import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getAllGames = () => {
    getGames().then((data) => setGames(data));
  };
  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <article className="games">
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 10px' }}>
        <h1>Games</h1>
        <Button onClick={() => {
          router.push('/games/new');
        }}
        >Register New Game
        </Button>
      </div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '10px 0 10px',
      }}
      >
        {games.map((game) => (
          <section key={`game--${game.id}`} className="game">
            <GameCard id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} onUpdate={getAllGames} />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
