import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../pages/Root';

import Subheader from '../components/Subheader';
import Header from '../components/Header';
import Button from '../components/Button';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryWriter = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

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

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, []);
  return (
    <div className="DiaryWriter">
      <Header
        headText={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
      />
      <section>
        <Subheader text={isEdit ? '일기 날짜' : '오늘은 언제인가요?'} />
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
          <Button
            text={isEdit ? '수정 완료' : '작성 완료'}
            type={'positive'}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryWriter;
