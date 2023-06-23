import React, { useState, useRef } from "react";
import ShowTodos from "./ShowTodos";
import TodoDone from "./TodoDone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoFunc,
  deleteTodoFunc,
  finishWorkFunc,
  goToWorkFunc,
} from "../redux/config/modules/bottomTodo";
import uuid from "react-uuid";

const TodoComponent = () => {
  const modalRef = useRef();
  const [dividedBtn, setDividedBtn] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.bottomTodo);

  // 모달
  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setDividedBtn(false);
    }
  };
  const changeBtn = () => {
    setDividedBtn(dividedBtn === false ? true : false);
  };

  // 인풋
  const ongoingChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  //폼 제출 이벤트
  const ongoingInput = (e) => {
    e.preventDefault();
    dispatch(addTodoFunc({ id: uuid(), inputValue, isWork: true }));
    setInputValue("");
    setDividedBtn(false);
  };

  //삭제버튼
  const onRemove = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(deleteTodoFunc(id));
    }
  };

  //완료버튼
  const finishWork = (id) => {
    dispatch(finishWorkFunc(id));
  };

  //완료를 다시 working
  const goToWork = (id) => {
    dispatch(goToWorkFunc(id));
  };
  return (
    <>
      <div className="ongoing-container">
        <h1>Ongoing task</h1>
        <button style={{ cursor: "pointer" }} onClick={changeBtn}>
          +
        </button>
      </div>
      {/* 모달 박스 */}
      {dividedBtn === true ? (
        <div
          className="ongoing-modal-background"
          ref={modalRef}
          onClick={(e) => modalOutSideClick(e)}
        ></div>
      ) : (
        ""
      )}
      {dividedBtn === true ? (
        <div className="ongoing-modal-input">
          <form onSubmit={ongoingInput}>
            <span>
              <FontAwesomeIcon className="faCheck" icon={faCheck} />
              <input type="text" required onChange={ongoingChangeInput}></input>
              <div className="underline"></div>
              <label>To do List</label>
            </span>

            <div>
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      {/* to do list */}
      {/* 리액트에서는 오브젝트 타입을 그대로 랜더링 할 수 없다.*/}

      <h2 style={{ color: "#ada5c5" }}>Working</h2>
      <div className="ShowTodos-container">
        {todoList.map((item) => {
          return item.isWork === true ? (
            <ShowTodos
              key={item.id}
              item={item}
              onRemove={onRemove}
              finishWork={finishWork}
            />
          ) : (
            ""
          );
        })}
      </div>
      <h2 style={{ color: "#a9d4ff" }}>Done</h2>
      <div className="ShowTodos-container">
        {todoList.map((item) => {
          return item.isWork === false ? (
            <TodoDone
              key={item.id}
              item={item}
              onRemove={onRemove}
              goToWork={goToWork}
            />
          ) : (
            ""
          );
        })}
      </div>
    </>
  );
};

export default TodoComponent;
