import Header from '../components/Header';
import Button from '../components/Button';
import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from './Root';
import { DiaryList } from '../components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };
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
