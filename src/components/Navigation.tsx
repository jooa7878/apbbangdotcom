import { Home } from "@material-ui/icons";
import { signOut } from "firebase/auth";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../atom";
import { authService } from "../firebase";

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

const LogOutBtn = styled.button`
  padding: 10px;
  border: 0;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  &:hover {
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 50px;
  }
`;

export default function Navigation() {
  const isLogin = useRecoilValue(loginState);
  const setLoginState = useSetRecoilState(loginState);
  const onClick = () => {
    const ok = window.confirm("로그아웃 하시겠습니까 ?");
    if (ok) {
      signOut(authService);
      setLoginState(false);
    }
  };
  return (
    <Nav>
      <StyledLink to="/">
        <Home></Home>
      </StyledLink>
      {isLogin ? (
        <>
          <LogOutBtn onClick={onClick}>로그아웃</LogOutBtn>
        </>
      ) : (
        <>
          <StyledLink to="/login">로그인</StyledLink>
        </>
      )}
    </Nav>
  );
}
