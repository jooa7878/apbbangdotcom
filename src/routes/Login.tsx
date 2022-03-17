import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../atom";
import { authService } from "../firebase";

const Form = styled.form`
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const FormDiv = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  width: 200px;
  border: 0;
  border-radius: 20px;
  padding: 5px 10px;
  text-align: center;
  margin-right: 10px;
`;

const Label = styled.label`
  padding: 10px;
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.textColor};
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

interface ILogin {
  id: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const history = useHistory();

  const [isLogin, setIsLogin] = useRecoilState(loginState);

  if (isLogin) {
    alert("잘못된 접근입니다.");
    history.push("/");
  }

  const onSubmit = async ({ id, password }: ILogin) => {
    try {
      await signInWithEmailAndPassword(authService, id, password);
      setIsLogin(true);
      history.push("/");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormDiv>
          <Label>아이디</Label>
          <Input
            {...register("id", {
              required: "아이디를 입력해주세요",
            })}
            type="text"
            placeholder="아이디를 입력해주세요"
          />
        </FormDiv>
        <FormDiv>
          <Label>비밀번호</Label>
          <Input
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </FormDiv>
        <SubmitBtn type="submit">로그인</SubmitBtn>
      </Form>
      {Object.entries(errors).length > 0 ? (
        <ErrorDiv>{Object.entries(errors)[0][1].message}</ErrorDiv>
      ) : null}
    </>
  );
}
