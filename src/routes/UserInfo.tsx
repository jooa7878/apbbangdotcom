import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Search } from "@material-ui/icons";
import { collection, getDocs, query } from "firebase/firestore";
import { dbService } from "../firebase";
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Form = styled.form``;

const FormDiv = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  width: 150px;
  border: 0;
  border-radius: 20px;
  padding: 5px 10px;
  text-align: center;
  margin-right: 10px;
`;

const SearchBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.accentColor};
  border: 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.bgColor};
    border-radius: 50px;
  }
`;

const ErrorDiv = styled.div`
  margin: 0 auto;
  width: 350px;
  margin-top: 20px;
  padding: 10px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.errorColor};
`;

const UserContainer = styled.div`
  margin-top: 40px;
`;

const UserTitle = styled.h2`
  font-size: 30px;
  color: ${(props) => props.theme.accentColor};
`;

interface IInput {
  username: string;
}

interface IUser {
  win: string;
  lose: string;
}

interface IWinSet {
  win: string;
}
interface ILoseSet {
  lose: string;
}

export default function UserInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser[]>();
  const [wSet, setWSet] = useState<IWinSet[]>();
  const [lSet, setLSet] = useState<ILoseSet[]>();

  const onSubmit = async ({ username }: IInput) => {
    setLoading(true);
    try {
      const userQuery = query(collection(dbService, "user"));
      const userDocs = await getDocs(userQuery);

      const userIdx = userDocs.docs.findIndex(
        (doc) => doc.id.replaceAll(" ", "") === username.replaceAll(" ", "")
      );

      if (userIdx !== -1) {
        const target = userDocs.docs[userIdx].data();
        setUser([{ win: target.win, lose: target.lose }]);
        setWSet(Array.from(new Set([...target.win])));
        setLSet(Array.from(new Set([...target.lose])));
      } else {
        alert("검색 결과가 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormDiv>
          <Input
            {...register("username", {
              required: "유저 이름을 입력해주세요",
            })}
            type="text"
            placeholder="이름을 입력하세요"
          />
          <SearchBtn type="submit">
            <Search style={{ fontSize: 20, verticalAlign: "middle" }} />
          </SearchBtn>
        </FormDiv>
        {Object.entries(errors).length > 0 ? (
          <ErrorDiv>{Object.entries(errors)[0][1].message}</ErrorDiv>
        ) : null}
      </Form>
      {/* <UserContainer>
        {loading ? (
          <CircularProgress />
        ) : user?.hasOwnProperty("win") ? (
          <>
            <UserTitle>검색 결과</UserTitle>
          </>
        ) : (
          <ErrorDiv>검색 결과가 없습니다.</ErrorDiv>
        )}
      </UserContainer> */}
    </Container>
  );
}
