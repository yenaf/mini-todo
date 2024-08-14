import React from 'react'

export default function Todo({item}) {
  console.log('자식컴포넌트',item);
  
  return (
    <div>
      <input type='checkbox' id={`todo${item.id}`} name={`todo${item.id}`} value={`todo${item.id}`} defaultChecked={item.done}/>
      <label htmlFor={`todo${item.id}`}>{item.title}</label>
    </div>
  )
}
