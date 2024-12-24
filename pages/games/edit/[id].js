import UpdateGame from '../../../components/game/UpdateGame';
import { useAuth } from '../../../utils/context/authContext';

const EditGame = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Update Game</h2>
      <UpdateGame user={user} />
    </div>
  );
};
export default EditGame;
