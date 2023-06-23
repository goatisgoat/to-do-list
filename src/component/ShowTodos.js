import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ShowTodos = ({ item, onRemove, finishWork }) => {
  const [textLine, setTextLine] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const ischecked = (e) => {
    setTextLine(e.target.checked);
  };
  const gotoDetail = (e) => {
    if (e.target === ref.current) {
      navigate(`/detail/${item.id}`);
    }

    console.log(e.currentTarget);
    console.log(ref.current);
  };
  return (
    <div style={{ cursor: "pointer" }}>
      <div className="ShowTodos-inside priority-high">
        <input onClick={ischecked} type="checkbox"></input>
        <p
          onClick={gotoDetail}
          ref={ref}
          className={textLine ? "textLineCss" : ""}
        >
          {item.inputValue}
        </p>
        <span className="ShowTodos-inside-span working">
          <button onClick={() => finishWork(item.id)}>finish</button>
          <button onClick={() => onRemove(item.id)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default ShowTodos;
