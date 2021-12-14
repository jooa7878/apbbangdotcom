import React from "react";
import "../style/Record.scss";

function Record() {
  return (
    <div className="record_container">
      <h2 className="record_title">최근 스타 경기</h2>
      <div className="record_btn_container">
        <button className="btn">개인</button>
        <button className="btn">리그</button>
      </div>
    </div>
  );
}

export default Record;
