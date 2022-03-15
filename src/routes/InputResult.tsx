import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Races } from "../atom";

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
  id: number;
  race: Races;
}

export default function InputResult() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IResult>();

  const history = useHistory();
  const races = Races;
  const [race, setRace] = useState("Protoss");

  const onSubmit = () => {
    const ok = window.confirm("경기 결과를 입력하시겠습니까?");
    if (ok) {
      setValue("winner", "");
      setValue("loser", "");
      setValue("map", "");
      // history.push("/")
    }
  };

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setRace(value as any);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("race", {
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
        <Select value={race} onInput={onInput}>
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
