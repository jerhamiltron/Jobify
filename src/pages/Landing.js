import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import main from '../assets/images/main.svg';

import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  const { user } = useAppContext();

  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav className="nav">
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby blog etsy 8-bit cray sriracha iPhone knausgaard narwhal gatekeep mumblecore
              vape la croix disrupt quinoa. Marxism jean shorts flannel, lomo next level occupy
              kickstarter intelligentsia.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
