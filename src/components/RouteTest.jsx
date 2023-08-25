import { Link } from 'react-router-dom';

const RouteTest = () => {
  return (
    <nav>
      <Link to={'/'}>HOME</Link>
      <br />
      <Link to={'/diary'}>Diary</Link>
      <br />
      <Link to={'/new'}>New</Link>
      <br />
    </nav>
  );
};

export default RouteTest;
