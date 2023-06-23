const addCalenderTodo = "calenderTodoInput";
const deleteCalenderTodo = "DeleteCalenderTodo";
const selectedDotList = "selectedDotList";
const DeleteDotList = "DeleteDotList";

export const addCalenderTodoFunc = (payload) => {
  return {
    type: addCalenderTodo,
    payload: payload,
  };
};
export const deleteCalenderTodoFunc = (payload) => {
  return {
    type: deleteCalenderTodo,
    payload: payload,
  };
};
export const selectedDotListFunc = (payload) => {
  return {
    type: selectedDotList,
    payload: payload,
  };
};
export const DeleteDotListFunc = (payload) => {
  return {
    type: DeleteDotList,
    payload: payload,
  };
};
let initialState = {
  calenderTodoList: [],
  calenderDotList: [],
};

const calenderData = (state = initialState, action) => {
  switch (action.type) {
    case "calenderTodoInput":
      return {
        ...state,
        calenderTodoList: [...state.calenderTodoList, action.payload],
      };
    case "DeleteCalenderTodo":
      return {
        ...state,
        calenderTodoList: [
          ...state.calenderTodoList.filter(
            (item) => item.id !== action.payload
          ),
        ],
      };
    case "selectedDotList":
      return {
        ...state,
        calenderDotList: [...state.calenderDotList, action.payload],
      };
    case "DeleteDotList":
      state.calenderDotList.splice(action.payload, 1);
      return {
        ...state,
        calenderDotList: [...state.calenderDotList],
      };

    default:
      return { ...state };
  }
};

export default calenderData;
