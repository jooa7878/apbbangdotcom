import { Link as ReactRouterDomLink } from "react-router-dom";
import styled from "styled-components";

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

export default function Home() {
  return (
    <>
      <StyledLink to="/inputresult">전적 입력하러 가기</StyledLink>
    </>
  );
}
