import React, { FormEvent, ChangeEvent, useState } from "react";
import style from "./Header.module.scss";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import type { HeaderPropsType } from "../../types/types";

export default function Header({ getValue }: HeaderPropsType) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getValue(value);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <header className={style.header}>
      <Container
        maxWidth="md"
        sx={{
          "&.MuiContainer-maxWidthMd": {
            maxWidth: "1440px",
          },
        }}
      >
        <form className={style.header_form} onSubmit={handleSubmit}>
          <input
            id="search"
            autoFocus
            name="search"
            className={style.header_input}
            type="text"
            placeholder="Введите поисковый запрос"
            value={value}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            ИСКАТЬ
          </Button>
        </form>
      </Container>
    </header>
  );
}
