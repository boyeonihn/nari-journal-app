import { Outlet, Link } from 'react-router-dom';
import React, { useReducer, useRef } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((n) => n.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((n) =>
        n.id === action.data.id ? { ...action.data } : n
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

export default function Root() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(data.length);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId,
    });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <div className="App">
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <DiaryStateContext.Provider value={data}>
          <h1>
            <Link to={'/'}>나리 기록들</Link>
          </h1>
          <Outlet />
        </DiaryStateContext.Provider>
      </DiaryDispatchContext.Provider>
    </div>
  );
}
