import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { matchState } from "../atom";
import { Check } from "@material-ui/icons";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const TotalContainer = styled.div`
  margin: 20px auto;
  text-align: center;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const MatchList = styled.ul``;

const MatchItem = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  line-height: 80px;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const MoreBtn = styled.button`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 50px;
`;

const LeftSpan = styled.div`
  float: left;
  width: 22%;
  text-align: center;
`;

const RightSpan = styled.div`
  float: right;
  width: 20%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function TotalMatch() {
  const matchList = useRecoilValue(matchState);
  const [renderList, setRenderList] = useState(matchList?.slice(0, 5));
  const [loading, setLoading] = useState(false);

  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    if (matchList.length - renderList.length > 5) {
      setRenderList([
        ...renderList,
        ...matchList.slice(renderList.length, renderList.length + 5),
      ]);
    } else {
      setRenderList([
        ...renderList,
        ...matchList.slice(
          renderList.length,
          renderList.length + matchList.length - renderList.length
        ),
      ]);
      if (matchList.length === renderList.length) {
        e.currentTarget.style.display = "none";
      }
    }

    setLoading(false);
  };

  return (
    <TotalContainer>
      <MatchList>
        {renderList.map((match) => {
          return (
            <MatchItem key={match?.id}>
              <LeftSpan>{match?.date.slice(2)}</LeftSpan>
              {match?.loser?.loser} {match?.loser?.loserRace.slice(0, 1)} vs
              {match?.winner?.winner} {match?.winner?.winnerRace.slice(0, 1)}{" "}
              <Check />
              <RightSpan>{match?.map}</RightSpan>
            </MatchItem>
          );
        })}
      </MatchList>
      {loading ? (
        <CircularProgress />
      ) : (
        <MoreBtn onClick={onBtnClick}>더 보기</MoreBtn>
      )}
    </TotalContainer>
  );
}
