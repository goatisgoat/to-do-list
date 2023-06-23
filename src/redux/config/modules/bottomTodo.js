const addTodo = "todoList";
const deleteTodo = "deleteTodoList";
const finishWork = "finishWork";
const goToWork = "goToWork";

export const addTodoFunc = (payload) => {
  return {
    type: addTodo,
    payload: payload,
  };
};
export const deleteTodoFunc = (payload) => {
  return {
    type: deleteTodo,
    payload: payload,
  };
};
export const finishWorkFunc = (payload) => {
  return {
    type: finishWork,
    payload: payload,
  };
};
export const goToWorkFunc = (payload) => {
  return {
    type: goToWork,
    payload: payload,
  };
};

let initialState = {
  todoList: [],
};

const bottomTodo = (state = initialState, action) => {
  switch (action.type) {
    case "todoList":
      return { ...state, todoList: [...state.todoList, action.payload] };

    case "deleteTodoList":
      return {
        ...state,
        todoList: [
          ...state.todoList.filter((item) => item.id !== action.payload),
        ],
      };
    case "finishWork":
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          return item.id === action.payload ? { ...item, isWork: false } : item;
        }),
      };
    case "goToWork":
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          return item.id === action.payload ? { ...item, isWork: true } : item;
        }),
      };
    default:
      return { ...state };
  }
};

export default bottomTodo;
