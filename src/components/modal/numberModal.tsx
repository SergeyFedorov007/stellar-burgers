import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '.';
import { OrderInfo } from '../order-info';
import ProtectedRoute from '../route';

const FeedWithModal = () => {
  const navigate = useNavigate();
  const { number } = useParams();

  return (
    <Modal
      title={`#${number}`}
      onClose={() => {
        navigate('/feed');
      }}
    >
      <OrderInfo />
    </Modal>
  );
};

const ProfileOrderWithModal = () => {
  const navigate = useNavigate();
  const { number } = useParams();

  return (
    <ProtectedRoute>
      <Modal
        title={`#${number}`}
        onClose={() => {
          navigate('/profile/orders/');
        }}
      >
        <OrderInfo />
      </Modal>
    </ProtectedRoute>
  );
};

export { FeedWithModal, ProfileOrderWithModal };
