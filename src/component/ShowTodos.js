import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const ShowTodos = ({ item, onRemove, index, finishWork }) => {
  const [textLine, setTextLine] = useState(false);
  const ischecked = (e) => {
    setTextLine(e.target.checked);
  };
  return (
    <div>
      <div className="ShowTodos-inside priority-high">
        <input onClick={ischecked} type="checkbox"></input>
        <p className={textLine ? "textLineCss" : ""}>{item.inputValue}</p>
        <span className="ShowTodos-inside-span working">
          <button onClick={() => finishWork(index)}>finish</button>
          <button onClick={() => onRemove(index)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default ShowTodos;
