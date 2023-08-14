import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { DiaryItem } from '../components/DiaryItem';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { value: 'all', name: '전부다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안 좋은 감정만' },
];
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
export const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const navigate = useNavigate();
  const getProcessedDiaryList = () => {
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const ratingFilteredList = copyList.filter((it) => {
      if (filter === 'good') {
        if (it.emotion > 3) return it;
      } else if (filter === 'bad') {
        if (it.emotion <= 3) return it;
      } else {
        return it;
      }
    });

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const sortedList = ratingFilteredList.sort(compare);
    return sortedList;
  };

  return (
    <section className="DiaryList">
      <div className="menu_container">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <Button
            text="새 일기 쓰기"
            type="positive"
            onClick={() => {
              navigate('/new');
            }}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem
          key={it.id}
          text={it.content}
          emotion={it.emotion}
          createdAt={it.date}
          id={it.id}
        />
      ))}
    </section>
  );
};
