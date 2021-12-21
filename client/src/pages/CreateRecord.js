import React, { useState } from "react";
import "../style/CreateRecord.scss";

function CreateRecord() {
  const [player_1, setPlayer_1] = useState();
  const [player_2, setPlayer_2] = useState();
  const [winner, setWinner] = useState();

  function onSumbit(e) {
    e.preventDefault();

    if (checkInputs()) {
      window.alert("입력 데이터 확인! 추후 기능 업데이트 예정입니다.");
    }
  }

  function checkInputs() {
    if (
      player_1 === undefined ||
      player_2 === undefined ||
      winner === undefined ||
      player_1 === "" ||
      player_1.trim() === "" ||
      player_2 === "" ||
      player_2.trim() === "" ||
      winner === "" ||
      winner.trim() === ""
    ) {
      window.alert("입력이 안 된 사항이 있습니다.");
      return false;
    } else if (player_1 === player_2) {
      window.alert("입력 값을 다시 확인해주세요.");
      return false;
    } else if (winner !== player_1 && winner !== player_2) {
      window.alert("승자를 제대로 입력해주세요.");
      return false;
    }

    return true;
  }
  return (
    <div className="create_container">
      <form className="form_container" onSubmit={onSumbit}>
        <h1 className="form_title">경기 입력하기</h1>
        <div className="input_container">
          <label htmlFor="player_1" className="form_label">
            플레이어 1
          </label>
          <input
            type="text"
            id="player_1"
            className="form_input"
            onChange={(e) => {
              setPlayer_1(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="player_2" className="form_label">
            플레이어 2
          </label>
          <input
            type="text"
            id="player_2"
            className="form_input"
            onChange={(e) => {
              setPlayer_2(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="winner" className="form_label">
            승자
          </label>
          <input
            type="text"
            id="winner"
            className="form_input"
            onChange={(e) => {
              setWinner(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn_submit">
          전송
        </button>
      </form>
    </div>
  );
}

export default CreateRecord;
