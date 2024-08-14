import React, { useState } from 'react'

export default function Todo({item, deleteItem}) {
  console.log('자식컴포넌트',item);//{id: 1, title: 'my todo1', done: false}

  const [todoItem,setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteButtonClick=()=>{
    deleteItem(todoItem);
  }

  const offReadOnlyMode = ()=>{
    setReadOnly(false);
  } //커서는 깜박거리지만 입력은 할수 없다

  // 엔터키 누르면 readOnly를 true로 변경
  const enterKeyEventHandler = (e)=>{
    if(e.key==='Enter'){
      setReadOnly(true);
    }
  }

  const editEventHandler = (e)=>{
    const {title,...rest} = todoItem;
    setTodoItem({
      title:e.target.value,
      ...rest
    });
  }

  const checkboxEventHandler = (e)=>{
    console.log(e.target.checked);
    
    const {done,...rest} = todoItem;
    setTodoItem({
      done:e.target.checked,
      ...rest
    })
  }
  
  return (
    <div>
      <input type='checkbox' id={`todo${todoItem.id}`} name={`todo${todoItem.id}`} 
        value={`todo${todoItem.id}`} 
        defaultChecked={todoItem.done}
        onChange={checkboxEventHandler}
      />
      {/* <label htmlFor={`todo${item.id}`}>{item.title}</label> */}
      <input type='text' value={todoItem.title} readOnly={readOnly} 
        onClick={offReadOnlyMode}
        onChange={editEventHandler}
        onKeyDown={enterKeyEventHandler}
      />
      <button onClick={onDeleteButtonClick}>x</button>
    </div>
  )
}
