import { Outlet } from 'react-router-dom';
import RouteTest from '../components/RouteTest';
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


export default function Root() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
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
    <>
      <h1>나리 기록들</h1>
      <RouteTest />
      <Outlet />
    </>
  );
}
