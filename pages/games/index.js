import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
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
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} />
        </section>
      ))}
    </article>
  );
}

export default Home;
