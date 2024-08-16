import React, { useState } from 'react';
import '../styles/AddTodo.scss';

export default function AddTodo({addItem}) {
  const [todoItem,setTodoItem] = useState({
    title :'',
  }); //사용자 입력을 저장할 객체 title만 작성(id 자동, done 기본값 정해져있기때문)

  const onButtonClick = () => {
    addItem(todoItem); // add 함수 사용.
    setTodoItem({
      title: '', // 상태 초기화
    });
  };

  const enterKeyEventHandler = (e)=>{
    if(e.key==='Enter'){
      onButtonClick();
    }
  }
  
  return (
    <div className='AddTodo'>
      <input type='text' placeholder='add your new todo'
        value={todoItem.title}
        onChange={(e)=>{
          setTodoItem({title : e.target.value});
        }}
        onKeyDown={enterKeyEventHandler}
      />
      <button onClick={onButtonClick}>add</button>
    </div>
  )
}
