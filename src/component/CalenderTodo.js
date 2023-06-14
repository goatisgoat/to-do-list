import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const CalenderTodo = ({ item, i, deleteDateInfo }) => {
  const [textLine, setTextLine] = useState(false);
  const ischecked = (e) => {
    setTextLine(e.target.checked);
  };
  return (
    <div className="calender-info-comment">
      <input onClick={ischecked} type="checkbox"></input>
      <p className={textLine ? "textLineCss" : ""}>{item.value}</p>{" "}
      <button id={i} onClick={deleteDateInfo}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
};

export default CalenderTodo;
