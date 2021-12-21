import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../style/Record.scss";

const dummyData_1on1 = [
  { id: 0, player_1: "감자", player_2: "안상", winner_player: 1 },
  { id: 1, player_1: "감자", player_2: "안상", winner_player: 2 },
  { id: 2, player_1: "형준", player_2: "창균", winner_player: 1 },
  { id: 3, player_1: "형준", player_2: "창균", winner_player: 2 },
];

function Record() {
  function rendering() {
    const renderList = [];
    let list = dummyData_1on1;

    for (let i = 0; i < 4; i++) {
      renderList.push(
        <li className="record_item">
          <div className="record_info">
            {list[i].winner_player === 1 ? (
              <>
                <span className="winner_sign">W</span>
                <span className="record_span winner">{list[i].player_1}</span>
                vs
                <span className="record_span">{list[i].player_2}</span>
              </>
            ) : (
              <>
                <span className="record_span">{list[i].player_1}</span>
                vs
                <span className="record_span winner">{list[i].player_2}</span>
                <span className="winner_sign">W</span>
              </>
            )}
          </div>
        </li>
      );
    }

    return renderList;
  }

  return (
    <div className="record_container">
      <h2 className="record_title">최근 스타 경기</h2>
      <div className="record_btn_container"></div>
      <ul className="record_list">{rendering()}</ul>
      <Link to="/createrecord" class="record_link">
        전적 입력하러 가기
      </Link>
    </div>
  );
}

export default Record;
