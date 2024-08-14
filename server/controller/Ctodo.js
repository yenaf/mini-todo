const { Todo } = require("../models");
const { Op, where } = require("sequelize");

// show all todos(READ)
// _ 언더바는 : 이인자는 쓰지않겠다는 의미
exports.readTodos = async (_, res) => {
  try {
    let todos = await Todo.findAll();
    res.send(todos);
  } catch (error) {
    res.send(error);
  }
};

exports.createTodo = async (req, res) => {
  console.log("req.body -", req.body);

  try {
    let newTodo = await Todo.create({
      title: req.body.title,
  
      // todoItem 추가시 false가 기본 값
    });
    console.log("newTodo -", newTodo);
    res.send(newTodo);
  } catch (error) {
    res.send(error);
  }
};

exports.updateTodo = async(req,res)=>{
  console.log(req.body);
  try {
    // 배열 구조분해
    // update()메서드는 업데이트 된 행의 수를 나타내는 값을 반환
    // 그 반환 값은 배열 형태로 제공
    // 배열 구조 분해 할당을 통해 배열의 첫번쨰 요소를 변수에 할당할수 있음
    // [idUpdated] =[0] or [1]
    // 한개의 행이 바뀌면 1개반환 2개의 행이 바뀌면 2개반환
    let [idUpdated] = await Todo.update({
      title : req.body.title,//요청 본문에서 'title' 값을 가져와서 업데이트
      done : req.body.done,//요청 본문에서 'done' 값을 가져와서 업데이트
    },{
      where:{
        id:{[Op.eq]:req.params.todoId},//경로 파라미터에서 todoId를 사용하여 특정 todo항목을 찾아라
        // Op.eq는 sequelize의 연산자로 "equals"(같음) 라는 뜻
      }
    });
    if(idUpdated===0){ 
      return res.send(false);
      //업데이트 된 항목이 없으면 false반환 ->수정 실패
    }
    res.send(true); //업데이트가 성공적으로 이뤄지면 true 반환
  } catch (error) {
    res.send(error);
  }
}

exports.deleteTodo = async(req,res)=>{
  try {
    let isDeleted = await Todo.destroy({
      where :{
        id:{[Op.eq] : req.params.todoId},
      },
    });
    if(!isDeleted){
      return res.send(false);
    }
    res.send(true);
  } catch (error) {
    res.send(error);
  }
}
