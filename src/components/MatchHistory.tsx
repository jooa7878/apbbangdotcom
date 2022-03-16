import { IMatch } from "../atom";
import styled from "styled-components";
import { Check } from "@material-ui/icons";

const MatchBox = styled.li`
  padding: 15px 10px;
  border-bottom: 1px solid ${(props) => props.theme.textColor};

  &:last-child {
    border-bottom: 0;
  }
`;

export default function MatchHistory({ winner, loser }: IMatch) {
  return (
    <MatchBox>
      <Check style={{ fontSize: 16 }} />
      {winner?.winner} vs {loser?.loser}
    </MatchBox>
  );
}
