import Header from '../components/Header';
import Button from '../components/Button';

const Home = () => {
  return (
    <section>
      <Header
        headText={headText}
        leftChild={<Button text={'<'} onClick={decreaseMonth} />}
        rightChild={<Button text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </section>
  );
};

export default Home;
