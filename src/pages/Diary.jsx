import { useParams } from 'react-router-dom';

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <section>
      <h1>Diary</h1>
      <p>이곳은 Diary입니다</p>
    </section>
  );
};

export default Diary;
