import React from 'react';

const EmotionItem = ({
  emotion_img,
  emotion_descript,
  emotion_id,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={[
        'input_emotion',
        'EmotionItem',
        `emotion_img_${emotion_id}`,
        isSelected ? `EmotionItem_on_${emotion_id}` : '',
      ].join(' ')}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} className="input_emotion_img" />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
