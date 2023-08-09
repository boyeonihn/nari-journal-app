import Header from '../components/Header';
import Button from '../components/Button';

const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      <Header
        headText="Nari Journal"
        leftChild={
          <Button text={'왼쪽 버튼'} onClick={() => alert('왼쪽 클릭')} />
        }
        rightChild={
          <Button text={'오른쪽 버튼'} onClick={() => alert('오른쪽 클릭')} />
        }
      />
      <p>이곳은 Home입니다</p>
    </section>
  );
};

export default Home;
