import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IMatch, matchState } from "../atom";
import MatchHistory from "../components/MatchHistory";
import { dbService } from "../firebase";

const Link = (props: any) => {
  return <ReactRouterDomLink {...props}>{props.children}</ReactRouterDomLink>;
};

const StyledLink = styled(Link)`
  display: block;
  width: 200px;
  height: 30px;
  margin: 30px auto;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  transition: 0.3s;
  &:hover {
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.textColor};
  }
`;

const MatchDiv = styled.ul`
  margin: 15px auto 0;
  text-align: center;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  width: 300px;
`;

const MsgDiv = styled.div`
  text-align: center;
  position: relative;
  padding: 10px;
  height: 60px;
`;

const Msg = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
`;

const MoreLink = styled(Link)`
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  &:hover {
    border: 1px solid ${(props) => props.theme.textColor};
  }
`;

const EmptyMsg = styled.p`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  font-size: 18px;
  padding: 10px;
  text-align: center;
`;

export default function Home() {
  const [matchList, setMatchList] = useRecoilState(matchState);

  useEffect(() => {
    const q = query(
      collection(dbService, "matchHistory"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMatchList(list as any);
    });
  }, []);

  return (
    <>
      <StyledLink to="/inputresult">전적 입력하러 가기</StyledLink>

      {matchList.length > 0 ? (
        <>
          <MsgDiv>
            <Msg>최근 경기 기록</Msg>
            <MoreLink to="/totalmatch">더 보기</MoreLink>
          </MsgDiv>
          <MatchDiv>
            {matchList?.slice(0, 5)?.map((match: IMatch) => {
              return <MatchHistory key={match.id} {...match} />;
            })}
          </MatchDiv>
        </>
      ) : (
        <EmptyMsg>
          최근 경기 기록이 없습니다.
          <br /> 전적을 입력하여 기록을 추가해보세요!
        </EmptyMsg>
      )}
    </>
  );
}