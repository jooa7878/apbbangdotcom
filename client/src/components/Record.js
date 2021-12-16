import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../style/Record.scss";

const dummyData_1on1 = [
  { id: 0, player_1: "감자", player_2: "안상", winner_player: 1 },
  { id: 1, player_1: "감자", player_2: "안상", winner_player: 2 },
  { id: 2, player_1: "형준", player_2: "창균", winner_player: 1 },
  { id: 3, player_1: "형준", player_2: "창균", winner_player: 2 },
];

const dummyData_league = [
  {
    id: 0,
    player_1: ["안상", "감자", "창균", "승찬"],
    player_2: ["원모", "준영", "형준", "지원"],
    winner_player: 1,
  },
  {
    id: 1,
    player_1: ["안상", "감자", "창균", "승찬"],
    player_2: ["원모", "준영", "형준", "지원"],
    winner_player: 2,
  },
  {
    id: 2,
    player_1: ["안상", "감자", "창균", "승찬"],
    player_2: ["원모", "준영", "형준", "지원"],
    winner_player: 1,
  },
  {
    id: 3,
    player_1: ["안상", "감자", "창균", "승찬"],
    player_2: ["원모", "준영", "형준", "지원"],
    winner_player: 2,
  },
];

function Record() {
  const [flag, setFlag] = useState("1on1");

  function rendering(flag) {
    const renderList = [];
    let list = [];

    if (flag === "personal") list = dummyData_1on1;
    else list = dummyData_league;

    for (let i = 0; i < 4; i++) {
      renderList.push(
        <li className="record_item">
          <span className="record_num">{list[i].id + 1}</span>
          <div className="record_info">
            {list[i].winner_player === 1 ? (
              <>
                <span className="record_span winner">{list[i].player_1}</span>
                vs
                <span className="record_span">{list[i].player_2}</span>
              </>
            ) : (
              <>
                <span className="record_span">{list[i].player_1}</span>
                vs
                <span className="record_span winner">{list[i].player_2}</span>
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
      <div className="record_btn_container">
        <button
          className="btn selected"
          onClick={(e) => {
            document.querySelector(".selected").classList.remove("selected");
            setFlag("1on1");
            e.target.classList.add("selected");
          }}
        >
          개인
        </button>
        <button
          className="btn"
          onClick={(e) => {
            document.querySelector(".selected").classList.remove("selected");
            setFlag("league");
            e.target.classList.add("selected");
          }}
        >
          리그
        </button>
      </div>
      <ul className="record_list">
        {flag === "1on1" ? rendering("personal") : rendering("league")}
      </ul>
      <Link to="/createrecord" class="record_link">
        전적 입력하러 가기
      </Link>
    </div>
  );
}

export default Record;
