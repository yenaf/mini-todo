import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import axios from 'axios';
import './styles/App.scss';
import {API_BASE_URL} from './app-config';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  
  // [env 버전]
  const DB_HOST = process.env.REACT_APP_DB_HOST;

  // [app-config.js 버전]
  console.log(`${API_BASE_URL}`);
  

  // [벡엔드 프론트 API연결]
  // read API
  useEffect(()=>{
    console.log('첫 렌더링 완료!');
    const getTodos = async()=>{
      let res = await axios.get(`${DB_HOST}/api/todos`);
      setTodoItems(res.data);
    };
    getTodos()
  },[]);

  // AddTodo 컴포넌트는 상위 컴포넌트 items에 접근 불가능.
  // 상위 컴포넌트인 App은 AddTodo에 접근 가능.
  // => App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용.

  // const addItem = (newItem) => {
  //   newItem.id = todoItems.length + 1; // key를 위한 id 추가.
  //   newItem.done = false; // done 초기화
  //   setTodoItems([...todoItems, newItem]);
  // };

  // create API
  const addItem = async(newItem) => {
    const res =  await axios.post(`${DB_HOST}/api/todo`,newItem);
    setTodoItems([...todoItems, res.data]);
  };
  // const deleteItem=(targetItem)=>{
  //   const newTodoItems = todoItems.filter((e)=>e.id !== targetItem.id);
  //   setTodoItems(newTodoItems);
  // }

  // delete API
  const deleteItem=async(targetItem)=>{
    await axios.delete(`${DB_HOST}/api/todo/${targetItem.id}`);
    const newTodoItems = todoItems.filter((e)=>e.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  // 즉 update()
  const updateItem = async(targetItem)=>{
    console.log(targetItem);
    await axios.patch(`${DB_HOST}/api/todo/${targetItem.id}`,targetItem);
  }

  return (
    <div className="App">
      <h2>TODO LIST</h2>
      <AddTodo addItem={addItem} />
      {todoItems.map((item) => {
        // console.log('item >>>>> ', item); // {id: 1, title: 'my todo1', done: false}
        return <Todo key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem}/>;
      })}
    </div>
  );
}

export default App;