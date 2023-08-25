import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { DiaryStateContext } from './Root';
import Button from '../components/Button';
import { getStringDate } from '../util/date';
import Subheader from '../components/Subheader';
import { emotionList } from '../util/emotion';

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `나리 일기 - ${id}번 일기`;
  }, []);
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기입니다');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩 중입니다...</div>;
  } else {
    const targetEmotion = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <Header
          leftChild={
            <Button text={'< 뒤로 가기'} onClick={() => navigate(-1)} />
          }
          rightChild={
            <Button
              text={'수정하기'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
          headText={`${getStringDate(new Date(data.date))} 기록`}
        />
        <article>
          <section className="diary_info_wrapper">
            <Subheader text={'오늘의 감정'} />
            <div
              className={[
                'diary_img_wrapper',
                `diary_img_wrapper_${data.emotion}`,
              ].join(' ')}
            >
              <img src={targetEmotion.emotion_img} />
              <div className="emotion_descript">
                {targetEmotion.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <Subheader text={'오늘의 일기'} />
            <div className="diary_content_wrapper">
              {' '}
              <p>{data.content}</p>
            </div>
          </section>
        </article>{' '}
      </div>
    );
  }
};

export default Diary;
