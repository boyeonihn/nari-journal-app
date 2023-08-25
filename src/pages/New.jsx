import { useEffect } from 'react';
import DiaryWriter from '../components/DiaryWriter';

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `나리 일기 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryWriter />
    </div>
  );
};

export default New;
