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
  border-radius: 20px;
  padding: 5px 10px;
  text-align: center;
  margin-right: 10px;
`;

const DateInput = styled(Input)`
  width: 200px;
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

      alert("????????? ??? ?????? ???????????????.");
      return;
    }
    if (winner.replaceAll(" ", "") === loser.replaceAll(" ", "")) {
      alert("????????? ????????? ????????? ??????????????????.");
      return;
    }
    const ok = window.confirm("?????? ????????? ?????????????????????????");
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
        alert("????????? ?????????????????????.");
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DateInput
        type="date"
        {...register("date", {
          required: "????????? ??????????????????",
        })}
      />
      <FormDiv>
        <Label>Winner</Label>
        <Input
          {...register("winner", {
            required: "????????? ??????????????????",
          })}
          type="text"
          placeholder="?????? ????????????"
        />
        <Select
          {...register("winnerRace", {
            required: "????????? ???????????????",
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
            required: "????????? ??????????????????",
          })}
          type="text"
          placeholder="?????? ????????????"
        />
        <Select
          {...register("loserRace", {
            required: "????????? ???????????????",
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
            required: "??? ????????? ??????????????????",
          })}
          type="text"
          placeholder="??? ????????????"
        />
      </FormDiv>
      <SubmitBtn type="submit">??????</SubmitBtn>

      {Object.entries(errors).length > 0 ? (
        <ErrorDiv>{Object.entries(errors)[0][1].message}</ErrorDiv>
      ) : null}
    </Form>
  );
}
