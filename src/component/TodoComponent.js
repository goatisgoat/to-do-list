import React, { useState, useRef } from "react";
import ShowTodos from "./ShowTodos";
import TodoDone from "./TodoDone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoComponent = () => {
  const [dividedBtn, setDividedBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [todoList, setTodoList] = useState([]);
  const modalRef = useRef();

  // 모달 박스
  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setDividedBtn(false);
    }
  };

  // 모달 박스 버튼
  const changeBtn = () => {
    setDividedBtn(dividedBtn === false ? true : false);
  };

  //폼 제출 이벤트
  const ongoingInput = (e) => {
    e.preventDefault();

    //사용자 입력 값 확인
    if (inputValue === "") {
      return alert("값을 입력해주세요");
    }

    setTodoList([...todoList, { inputValue, isWork: true }]);
    setInputValue("");
    setDividedBtn(false);
  };

  // 인풋 값 업데이트
  const ongoingChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  //삭제버튼
  const onRemove = (index) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setTodoList(todoList.filter((item, n) => n !== index));
    }
  };

  //완료버튼
  const finishWork = (index) => {
    setTodoList(
      todoList.map((item, i) => {
        return i === index ? { ...item, isWork: false } : item;
      })
    );
  };

  //완료를 다시 working으로 이동
  const goToWork = (index) => {
    setTodoList(
      todoList.map((item, i) => {
        return i === index ? { ...item, isWork: true } : item;
      })
    );
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
      {/* 모달 박스 */}

      {/* to do list */}
      {/* 리액트에서는 오브젝트 타입을 그대로 랜더링 할 수 없다.*/}
      <h2 style={{ color: "#ada5c5" }}>Working</h2>
      <div className="ShowTodos-container">
        {todoList.map((item, i) => {
          return item.isWork === true ? (
            <ShowTodos
              key={i}
              index={i}
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
        {todoList.map((item, i) => {
          return item.isWork === false ? (
            <TodoDone
              key={i}
              index={i}
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
