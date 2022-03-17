import {
  query,
  addDoc,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState, Races } from "../atom";
import { dbService } from "../firebase";

const Form = styled.form`
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const FormDiv = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100px;
  border: 0;
  border-radius: 20px;
  padding: 5px 10px;
  text-align: center;
  margin-right: 10px;
`;

const Label = styled.label`
  padding: 10px;
`;

const Select = styled.select`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  height: 40px;
  border-radius: 20px;
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

export interface IResult {
  winner: string;
  loser: string;
  map: string;
  winnerRace: Races;
  loserRace: Races;
  date: Date;
}

export default function InputResult() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResult>();

  const history = useHistory();
  const isLogin = useRecoilValue(loginState);

  const onSubmit = async ({
    winner,
    loser,
    winnerRace,
    loserRace,
    map,
    date,
  }: IResult) => {
    if (!isLogin) {
      history.replace("/login");

      alert("로그인 후 이용 가능합니다.");
      return;
    }
    if (winner.replaceAll(" ", "") === loser.replaceAll(" ", "")) {
      alert("승자와 패자의 이름은 달라야합니다.");
      return;
    }
    const ok = window.confirm("경기 결과를 입력하시겠습니까?");
    if (ok) {
      try {
        await addDoc(collection(dbService, "matchHistory"), {
          createdAt: Date.now(),
          winner: {
            winner,
            winnerRace,
          },
          loser: {
            loser,
            loserRace,
          },
          map,
          date,
        });

        const q = query(collection(dbService, "user"));
        const userDocs = await getDocs(q);
        const winnerIdx = userDocs.docs.findIndex(
          (doc) => doc.id.replaceAll(" ", "") === winner.replaceAll(" ", "")
        );

        if (winnerIdx !== -1) {
          // exist
          const target = userDocs.docs[winnerIdx].data();

          await setDoc(doc(collection(dbService, "user"), winner), {
            win: [...target.win, date],
            lose: target.lose,
          });
        } else {
          await setDoc(doc(collection(dbService, "user"), winner), {
            win: [date],
            lose: [],
          });
        }

        const loserIdx = userDocs.docs.findIndex(
          (doc) => doc.id.replaceAll(" ", "") === loser.replaceAll(" ", "")
        );

        if (loserIdx !== -1) {
          // exist
          const target = userDocs.docs[loserIdx].data();

          await setDoc(doc(collection(dbService, "user"), loser), {
            win: target.win,
            lose: [...target.lose, date],
          });
        } else {
          await setDoc(doc(collection(dbService, "user"), loser), {
            win: [],
            lose: [date],
          });
        }
        alert("입력이 완료되었습니다.");
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="date"
        {...register("date", {
          required: "날짜를 입력해주세요",
        })}
      />
      <FormDiv>
        <Label>Winner</Label>
        <Input
          {...register("winner", {
            required: "승자를 입력해주세요",
          })}
          type="text"
          placeholder="승자 입력하기"
        />
        <Select
          {...register("winnerRace", {
            required: "종족을 입력하세요",
          })}
        >
          <option value={Races.Protoss}>Protoss</option>
          <option value={Races.Terran}>Terran</option>
          <option value={Races.Zerg}>Zerg</option>
        </Select>
      </FormDiv>
      <FormDiv>
        <Label>Loser</Label>
        <Input
          {...register("loser", {
            required: "패자를 입력해주세요",
          })}
          type="text"
          placeholder="패자 입력하기"
        />
        <Select
          {...register("loserRace", {
            required: "종족을 입력하세요",
          })}
        >
          <option value={Races.Protoss}>Protoss</option>
          <option value={Races.Terran}>Terran</option>
          <option value={Races.Zerg}>Zerg</option>
        </Select>
      </FormDiv>
      <FormDiv>
        <Label>Map</Label>
        <Input
          {...register("map", {
            required: "맵 이름을 입력해주세요",
          })}
          type="text"
          placeholder="맵 입력하기"
        />
      </FormDiv>
      <SubmitBtn type="submit">제출</SubmitBtn>

      {Object.entries(errors).length > 0 ? (
        <ErrorDiv>{Object.entries(errors)[0][1].message}</ErrorDiv>
      ) : null}
    </Form>
  );
}
