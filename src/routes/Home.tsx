import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IMatch, matchState } from "../atom";
import MatchHistory from "../components/MatchHistory";
import { dbService } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

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
  right: 0;
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(
      collection(dbService, "matchHistory"),
      orderBy("date", "desc"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMatchList(list as any);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <StyledLink to="/inputresult">?????? ???????????? ??????</StyledLink>

          {matchList.length > 0 ? (
            <>
              <MsgDiv>
                <Msg>?????? ?????? ??????</Msg>
                <MoreLink to="/totalmatch">??? ??????</MoreLink>
              </MsgDiv>
              <MatchDiv>
                {matchList?.slice(0, 5)?.map((match: IMatch) => {
                  return <MatchHistory key={match.id} {...match} />;
                })}
              </MatchDiv>
            </>
          ) : (
            <EmptyMsg>
              ?????? ?????? ????????? ????????????.
              <br /> ????????? ???????????? ????????? ??????????????????!
            </EmptyMsg>
          )}

          <StyledLink to="/userinfo">?????? ?????? ?????? ?????? </StyledLink>
          <StyledLink to="/ranking">?????? ?????? ??????</StyledLink>
        </>
      )}
    </>
  );
}
