import { Outlet } from 'react-router-dom';
import RouteTest from '../components/RouteTest';

export default function Root() {
  return (
    <>
      <h1>나리 기록들</h1>
      <RouteTest />
      <Outlet />
    </>
  );
}
