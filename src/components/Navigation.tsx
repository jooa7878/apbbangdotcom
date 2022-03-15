import { Home, Style } from "@material-ui/icons";
import { Link as ReactRouterDomLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = (props: any) => {
  return <ReactRouterDomLink {...props}>{props.children}</ReactRouterDomLink>;
};

const StyledLink = styled(Link)`
  padding: 10px;
  &:hover {
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 50px;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <StyledLink to="/">
        <Home></Home>
      </StyledLink>
      <StyledLink to="/login">로그인</StyledLink>
    </Nav>
  );
}
