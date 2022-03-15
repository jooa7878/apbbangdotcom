import styled from "styled-components";

const FooterArea = styled.footer`
  margin-top: 100px;
  padding: 20px;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterArea>
      &copy; {new Date().getFullYear()} Aiden All rights reserved
    </FooterArea>
  );
}
