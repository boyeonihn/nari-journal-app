import { Outlet, Link } from 'react-router-dom';
import React, { useReducer, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jyaajucrzwugiboenayh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWFqdWNyend1Z2lib2VuYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwNDA4NTUsImV4cCI6MjAwODYxNjg1NX0.pJ5_ZmqkmRp9jU2M6A1dS4D6YAa1mGE2Mq1rgIdP_X4'
);

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      console.log('initialize');
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

  useEffect(() => {
    getDiaries();
  }, []);

  async function getDiaries() {
    const { data } = await supabase.from('diary_entries').select();

    if (data) {
      dataId.current = data.length + 1;
      dispatch({ type: 'INIT', data });
    }
  }

  //CREATE
  const onCreate = async (date, content, emotion) => {
    const newData = {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion,
    };
    const { error } = await supabase.from('diary_entries').insert(newData);

    dispatch({
      type: 'CREATE',
      data: newData,
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = async (targetId) => {
    const { error } = await supabase
      .from('diary_entries')
      .delete()
      .eq('id', targetId);

    dispatch({
      type: 'REMOVE',
      targetId,
    });
  };

  //EDIT
  const onEdit = async (targetId, date, content, emotion) => {
    const editedData = {
      date: new Date(date).getTime(),
      content,
      emotion,
    };

    const { error } = await supabase
      .from('diary_entries')
      .update(editedData)
      .eq('id', targetId);

    dispatch({
      type: 'EDIT',
      data: { ...editedData, id: targetId },
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
