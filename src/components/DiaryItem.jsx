import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from './Button';

export const DiaryItem = React.memo(({ text, emotion, createdAt, id }) => {
  const navigate = useNavigate();
  const date = new Date(createdAt);

  const goDiaryEntry = () => {
    navigate(`/diary/${id}`);
  };
  return (
    <section className="DiaryItem">
      <div
        onClick={goDiaryEntry}
        className={['emotionContainer', `emotionContainer_${emotion}`].join(
          ' '
        )}
      >
        <img src={`/assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDiaryEntry} className="DiaryContent">
        <h2>{date.toLocaleString('sv').slice(0, 16)}</h2>
        <p>{text}</p>
      </div>
      <Button
        text="수정하기"
        onClick={() => {
          navigate(`/edit/${id}`);
        }}
      />
    </section>
  );
});
