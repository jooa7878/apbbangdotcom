import React from "react";
import "../style/Ranking.scss";

const dummyData = [
  { id: 0, name: "오창균", winNums: 15 },
  { id: 1, name: "구원모", winNums: 12 },
  { id: 2, name: "온승찬", winNums: 10 },
  { id: 3, name: "함형준", winNums: 8 },
];

function Ranking() {
  function rendering() {
    const rankList = [];

    for (let i = 0; i < 4; i++) {
      rankList.push(
        <li className="ranking_item">
          <span className="ranking_index">{dummyData[i].id + 1}</span>
          <span className="ranking_name">{dummyData[i].name}</span>
          <span className="ranking_wins">{dummyData[i].winNums}승</span>
        </li>
      );
    }

    return rankList;
  }
  return (
    <div className="ranking_container">
      <h2 className="ranking_title">랭킹</h2>
      <ul className="ranking_list">{rendering()}</ul>
    </div>
  );
}

export default Ranking;
