import React, { useState } from "react";

import "../style/SignIn.scss";

function SignIn() {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    checkInputs();
  };

  const checkInputs = () => {
    const userIDValue = userID.trim();

    const idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (userIDValue === "") {
      window.alert("아이디를 입력해주세요.");
    } else if (!idRegExp.test(userIDValue)) {
      window.alert("아이디 양식을 확인하세요");
    } else if (userIDValue.length < 6) {
      window.alert("6자리 이상의 아이디를 입력해주세요.");
    } else if (userPassword === "" || userPassword.length < 8) {
      window.alert("비밀번호를 입력해주세요.");
    } else {
      window.alert("입력 데이터 확인, 추후 업데이트 예정입니다");
    }
  };

  return (
    <div className="signin_container">
      <div className="header">
        <h1 className="title">로그인</h1>
      </div>
      <form className="form_signin">
        <div className="form_control">
          <label className="form_label">ID</label>
          <input
            className="form_input"
            type="text"
            placeholder="영문 + 숫자로 구성, 6자리 이상"
            autoComplete="off"
            onChange={(e) => {
              setUserID(e.target.value);
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
        <button className="btn submit" onClick={onSubmit}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
