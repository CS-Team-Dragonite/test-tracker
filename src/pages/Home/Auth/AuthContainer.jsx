import { useState, useContext, ChangeEvent } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
// import { UserContext } from '../../../contexts/userContexts';
import { useNavigate } from 'react-router-dom';

const AuthContainer = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  // const { loggedIn, setLoggedIn } = useContext(UserContext);
  // const navigate = useNavigate();
  const handleLogOut = () => {
    console.log(' handleLogOut invoked!');
    // e.preventDefault();

    fetch('/user/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
    })
      .then((res) => {
        if (res.status === 204) {
          setLoggedIn(false);
          window.location.reload();
        } else {
          alert('Logout unsuccessful. Please retry.');
        }
      })
      .catch((err) => console.log('Logout ERROR: ', err));
  };

  return (
    <div>
      <ul className='flex gap-3'>
        <li>
          <Button
            className='mx-0 drop-shadow-sm'
            onClick={() => setOpenLoginModal(true)}
          >
            Sign In
          </Button>
        </li>
        <li className='mr-3'>

            <Button
              variant='secondary'
              className='mx-0 bg-secondary drop-shadow-sm'
              onClick={() => setOpenSignupModal(true)}
            >
              Sign Up
            </Button>
        </li>
      </ul>
      <Modal
        open={openLoginModal}
        onClose={() => {
          console.log('%c It closes', 'color: red');
          setOpenLoginModal(false);
        }}
      >
        <LoginForm />
      </Modal>
      <Modal
        open={openSignupModal}
        onClose={() => {
          console.log('%c It closes', 'color: red');
          setOpenSignupModal(false);
        }}
      >
        <SignupForm />
      </Modal>
    </div>
  );
};

export default AuthContainer;
