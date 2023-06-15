import React, { useState } from "react";
import { useRef } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CalenderTodo from "./CalenderTodo";

const ProjectsList = () => {
  // 캘린더를 눌러서 변경된 날짜, 사용자가 입력한 인풋 값이 저장됨
  const [inputValue, setInputValue] = useState({
    customdate: "",
    value: "",
  });
  // inputValue들을 저장할 배열
  const [todoList, setTodoList] = useState([]);
  // 캘린더 라이브러리 초기설정
  const [value, onChange] = useState(new Date());
  const moment = require("moment");
  //캘린더에 일정을 추가하면 점이 찍히는 날짜를 저장
  const [dotList, setDotList] = useState([]);
  const modalRef = useRef();
  // 클릭한 캘린더의 날짜를 알려줌
  const whichDate = moment(value).format("YYYY-MM-DD");
  //모달버튼
  const [dividedBtn, setDividedBtn] = useState(false);

  // 모딜창
  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setDividedBtn(false);
    }
  };

  // 모딜창 버튼
  const changeBtn = () => {
    setDividedBtn(dividedBtn === false ? true : false);
  };

  //폼 제출
  const formEvent = (e) => {
    e.preventDefault();
    setTodoList([...todoList, inputValue]);
    setDotList([...dotList, whichDate]);
    setDividedBtn(false);
  };

  // Monthly To Do List 내용물 삭제
  const deleteDateInfo = (e) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setTodoList(
        todoList.filter((item, i) => i !== Number(e.target.parentNode.id))
      );

      //도트 리스트도 지워줘야 그 날짜 값의 도트(.)가 사라짐
      let index = dotList.indexOf(whichDate);
      dotList.splice(index, 1);
      setDotList(dotList);
    }
  };

  return (
    <div>
      <h1 style={{ display: "flex", alignItems: "center" }}>
        Monthly To Do List
        <button
          onClick={changeBtn}
          style={{
            marginLeft: 10,
            width: 30,
            height: 30,
            fontSize: 20,
            borderRadius: 50,
            color: "white",
            backgroundColor: "#6e48ebc4",
            cursor: "pointer",
            border: "none",
          }}
        >
          +
        </button>
      </h1>
      <div className="monthly-container">
        {/* 모달 인풋 */}
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
            <form onSubmit={formEvent}>
              <span>
                <FontAwesomeIcon className="faCheck" icon={faCheck} />{" "}
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setInputValue({
                      customdate: moment(value).format("YYYY-MM-DD"),
                      value: e.target.value,
                    })
                  }
                />
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
        {/* 모달 인풋 */}

        <div className="calender-container">
          {/* 캘린더 */}
          <Calendar
            onChange={onChange}
            value={value}
            minDetail="month"
            maxDetail="month"
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("D")}
            calendarType="US"
            tileContent={({ date, view }) => {
              // 날짜 타일에 컨텐츠 추가하기 (html 태그)
              // 추가할 html 태그를 변수 초기화
              const html = [];
              // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
              if (
                dotList.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
                html.push(<div className="dot"></div>);
              }

              // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                </>
              );
            }}
          />{" "}
          {/* 캘린더 */}
        </div>

        <div className="text-gray-500 mt-4 calender-info">
          {/* 캘린더 옆 to do List 박스 */}
          <h4 style={{ color: "#6f48eb" }}>
            {moment(value).format("YYYY-MM-DD")}
          </h4>

          <div>
            {todoList.map((item, i) => {
              return item.customdate === whichDate ? (
                <CalenderTodo
                  item={item}
                  key={i}
                  i={i}
                  deleteDateInfo={deleteDateInfo}
                />
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
