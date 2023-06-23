import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const DivContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: #fffafa;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border: transparent;
  border-radius: 10px;
  font-family: sans-serif;

  & > h2 {
    color: #ffde82;
    font-weight: 800;
  }
`;

const InnerText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
`;

const IdBtnDiv = styled.div`
  margin-top: 40px;
  display: flex;
  padding: 10px;
  justify-content: space-between;

  & > span {
    width: 130px;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const BtnDiv = styled.button`
  padding: 5px 10px;
  background: #ffde82;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: 800;

  &:active {
    border: 1px solid #ffde82;
    background-color: white;
    color: #ffde82;
  }
`;

const Hamberger = styled.span`
  position: fixed;
  top: 15px;
  left: 20px;
  cursor: pointer;
`;

const Detail = () => {
  const { todoList } = useSelector((state) => state.bottomTodo);
  const [burger, setBurger] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const detailTodo = todoList.filter((item) => item.id === params.id);

  const burderFunc = () => {
    setBurger(burger === false ? true : false);
  };

  const SideBarFrameOpen = keyframes`
  from {
    left: -300px;
  }to {
    left: 0px;
  }
  `;

  const SideBarFrameClose = keyframes`
  from {
    left: 0px;
  }to {
    left: -300px;
  }
  `;

  const SideBar = styled.div`
    position: fixed;
    top: 0px;
    padding: 10px;
    font-family: sans-serif;
    left: -250px;
    width: 250px;
    height: 100vh;
    background-color: #ffde82;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
    animation-name: ${burger === true ? SideBarFrameOpen : SideBarFrameClose};
    animation-fill-mode: forwards;

    & > svg {
      position: absolute;
      left: 240px;
      top: 15px;
      color: white;
      cursor: pointer;
    }

    & > h2 {
      margin-bottom: 50px;
      color: white;
    }
    & > p {
      padding-left: 10px;
      cursor: pointer;
    }
  `;

  return (
    <DivContainer>
      <Hamberger>
        <FontAwesomeIcon onClick={burderFunc} icon={faBars} />
      </Hamberger>
      <SideBar>
        <h2>To do List</h2>
        <FontAwesomeIcon onClick={burderFunc} icon={faX} />
        <p onClick={() => navigate("/")}>Home</p>
        <p onClick={() => navigate("/")}>Detail</p>
        <p onClick={() => navigate("/")}>See more</p>
      </SideBar>
      <InnerContainer>
        <h2>&nbsp; Today To Do List</h2>
        <InnerText>
          <p>{detailTodo[0].inputValue}</p>
        </InnerText>
        <IdBtnDiv>
          <span>&nbsp;ID: {params.id}</span>
          <BtnDiv onClick={() => navigate("/")}>back</BtnDiv>
        </IdBtnDiv>
      </InnerContainer>
    </DivContainer>
  );
};

export default Detail;
