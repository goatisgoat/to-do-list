import React, { useState, useRef } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CalenderTodo from "./CalenderTodo";
import { useDispatch, useSelector } from "react-redux";
import {
  addCalenderTodoFunc,
  deleteCalenderTodoFunc,
  selectedDotListFunc,
  DeleteDotListFunc,
} from "../redux/config/modules/calenderData";
import uuid from "react-uuid";

const MainCalender = () => {
  const [inputValue, setInputValue] = useState("");

  // 캘린더 라이브러리
  const [value, onChange] = useState(new Date());
  const moment = require("moment");
  const whichDate = moment(value).format("YYYY-MM-DD");

  //모달버튼
  const [dividedBtn, setDividedBtn] = useState(false);
  const modalRef = useRef();
  //redux
  const dispatch = useDispatch();
  const { calenderTodoList } = useSelector((state) => state.calenderData);
  const { calenderDotList } = useSelector((state) => state.calenderData);

  // 모딜창
  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setDividedBtn(false);
    }
  };

  const changeBtn = () => {
    setDividedBtn(dividedBtn === false ? true : false);
  };

  //폼 제출
  const formEvent = (e) => {
    e.preventDefault();
    const inputObj = {
      id: uuid(),
      customdate: whichDate,
      inputValue,
    };
    dispatch(addCalenderTodoFunc(inputObj));
    dispatch(selectedDotListFunc(whichDate));
    setDividedBtn(false);
  };

  // Monthly To Do List 삭제
  const deleteDateInfo = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(deleteCalenderTodoFunc(id));

      let index = calenderDotList.indexOf(whichDate);
      dispatch(DeleteDotListFunc(index));
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
                  onChange={(e) => setInputValue(e.target.value)}
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
                calenderDotList.find(
                  (x) => x === moment(date).format("YYYY-MM-DD")
                )
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
        </div>

        <div className="text-gray-500 mt-4 calender-info">
          {/* 캘린더 옆 to do List */}
          <h4 style={{ color: "#6f48eb" }}>
            {moment(value).format("YYYY-MM-DD")}
          </h4>

          <div>
            {calenderTodoList.map((item) => {
              return item.customdate === whichDate ? (
                <CalenderTodo
                  item={item}
                  key={item.id}
                  id={item.id}
                  deleteDateInfo={deleteDateInfo}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCalender;
