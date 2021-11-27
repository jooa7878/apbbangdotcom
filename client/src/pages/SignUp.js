import React, { useState } from "react";

import "../style/SignUp.scss";

function SignUp() {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    checkInputs();
  };

  const checkInputs = () => {
    const userIDValue = userID.trim();
    const userNameValue = userName.trim();
    const idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (!isDuplicate) {
      window.alert("아이디 중복 확인을 먼저 해주세요.");
    } else if (userIDValue === "") {
      window.alert("아이디를 입력해주세요.");
    } else if (!idRegExp.test(userIDValue)) {
      window.alert("아이디 양식을 확인하세요");
    } else if (userIDValue.length < 8) {
      window.alert("8자리 이상의 아이디를 입력해주세요.");
    } else if (userNameValue === "") {
      window.alert("이름을 입력해주세요.");
    } else if (userPassword === "" || userPassword.length < 8) {
      window.alert("다른 비밀번호를 입력해주세요.");
    } else if (userPasswordCheck === "") {
      window.alert("비밀번호 확인을 입력해주세요.");
    } else if (userPassword !== userPasswordCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else {
      window.alert("입력 데이터 확인, 추후 업데이트 예정입니다");
    }
  };

  const onBtnCheckDup = async (e) => {
    e.preventDefault();

    if (userID === "" && userID.trim() === "") {
      window.alert("아이디를 입력해주세요.");
    } else if (userID.length < 8) {
      window.alert("8자리 이상의 아이디를 입력해주세요.");
    } else {
      setIsDuplicate(true);
      window.alert("아이디 입력 데이터 확인, 추후 업데이트 예정입니다");
    }
  };

  return (
    <div className="signup_container">
      <div className="header">
        <h1 className="title">초간단 회원가입</h1>
      </div>
      <form className="form_signup">
        <div className="form_control">
          <label className="form_label">ID</label>
          <input
            className="form_input"
            type="text"
            placeholder="영문 + 숫자로 구성, 8자리 이상"
            autoComplete="off"
            onChange={(e) => {
              setUserID(e.target.value);
              setIsDuplicate(false);
            }}
          />
          <button
            type="button"
            className="btn check_dup"
            onClick={onBtnCheckDup}
          >
            ID 중복 확인
          </button>
        </div>
        <div className="form_control">
          <label className="form_label">이름</label>
          <input
            className="form_input"
            type="text"
            placeholder="이름을 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">비밀번호</label>
          <input
            className="form_input"
            type="password"
            placeholder="8자리 이상의 비밀번호를 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className="form_control">
          <label className="form_label">비밀번호 확인</label>
          <input
            className="form_input"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            autoComplete="off"
            onChange={(e) => {
              setUserPasswordCheck(e.target.value);
            }}
          />
        </div>
        <button className="btn submit" onClick={onSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
