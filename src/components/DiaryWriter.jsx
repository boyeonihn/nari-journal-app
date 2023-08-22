import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../pages/Root';

import Subheader from '../components/Subheader';
import Header from '../components/Header';
import Button from '../components/Button';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: `/assets/emotion1.png`,
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: `/assets/emotion2.png`,
    emotion_descript: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: `/assets/emotion3.png`,
    emotion_descript: '그럭저럭',
  },
  {
    emotion_id: 4,
    emotion_img: `/assets/emotion4.png`,
    emotion_descript: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: `/assets/emotion5.png`,
    emotion_descript: '완전 나쁨',
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryWriter = () => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');

  const { onCreate } = useContext(DiaryDispatchContext);

  const onTextChange = (e) => {
    setContent(e.target.value);
  };

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate('/', { replace: true });
  };
  return (
    <div className="DiaryWriter">
      <Header
        headText="New Entry"
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
      />
      <section>
        <Subheader text="오늘은 언제인가요?" />
        <div className="input_box">
          <input
            className="input_date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </section>
      <section>
        <Subheader text="오늘의 감정" />
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id}
              onClick={handleClickEmote}
              {...it}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <Subheader text="오늘의 일기" />
        <div className="text_wrapper">
          <textarea
            ref={contentRef}
            className="input_textarea"
            placeholder="일기 쓰기..."
            value={content}
            onChange={onTextChange}
          ></textarea>
        </div>
      </section>
      <section>
        <div className="control_box">
          <Button text={'취소하기'} onClick={() => navigate(-1)} />
          <Button text={'작성 완료'} type={'positive'} onClick={handleSubmit} />
        </div>
      </section>
    </div>
  );
};

export default DiaryWriter;
