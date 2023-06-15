import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const TodoDone = ({ item, onRemove, index, goToWork }) => {
  const [textLine, setTextLine] = useState(false);
  const ischecked = (e) => {
    setTextLine(e.target.checked);
  };
  return (
    <div>
      <div>
        <div className="ShowTodos-inside priority-done">
          <input onClick={ischecked} type="checkbox"></input>
          <p className={textLine ? "textLineCss" : ""}>{item.inputValue}</p>
          <span className="ShowTodos-inside-span done">
            <button onClick={() => goToWork(index)}>cancel</button>
            <button onClick={() => onRemove(index)}>
              {" "}
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoDone;
