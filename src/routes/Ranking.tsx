import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { Star } from "@material-ui/icons";

const RankingDiv = styled.div`
  margin-top: 10px;
  text-align: center;
  width: 350px;
  margin: 0 auto;
`;

const RankingList = styled.ul`
  margin-top: 15px;
`;

const RankingItem = styled.li`
  padding: 10px;
  &::after {
    content: "";
    display: table;
    clear: both;
  }

  border-bottom: 1px solid ${(props) => props.theme.textColor};
`;

const RankingTitle = styled.header`
  font-size: 24px;
`;

const RankingIdx = styled.span`
  float: left;
`;

const UserWins = styled.span`
  float: right;
`;

interface IRanking {
  id: string;
  win: string[];
  lose: string[];
}

export default function Ranking() {
  const [ranking, setRanking] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(dbService, "user"));

    onSnapshot(q, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRanking(userList as any);
    });
    setLoading(false);
  }, []);

  ranking.sort((a, b) => b.win.length - a.win.length);

  return (
    <RankingDiv>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <RankingTitle>Ranking</RankingTitle>
          <RankingList>
            {ranking?.map((rank, idx) => {
              if (idx === 0) {
                return (
                  <RankingItem key={idx} style={{ color: "#51f542" }}>
                    <Star
                      style={{
                        verticalAlign: "middle",
                        float: "left",
                      }}
                    />
                    {rank.id}
                    <UserWins>{rank.win.length} 승</UserWins>
                  </RankingItem>
                );
              } else {
                return (
                  <RankingItem key={idx}>
                    <RankingIdx>{idx + 1}</RankingIdx>
                    {rank.id}
                    <UserWins>{rank.win.length} 승</UserWins>
                  </RankingItem>
                );
              }
            })}
          </RankingList>
        </>
      )}
    </RankingDiv>
  );
}
