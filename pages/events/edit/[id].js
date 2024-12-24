import UpdateEvent from '../../../components/event/UpdateEvent';
import { useAuth } from '../../../utils/context/authContext';

const EditEvent = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Update Game</h2>
      <UpdateEvent user={user} />
    </div>
  );
};
export default EditEvent;
