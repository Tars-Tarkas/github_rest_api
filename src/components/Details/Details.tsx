import React from "react";
import style from "./Details.module.scss";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import type { detailsTypes } from "../../types/types";

export default function Details({ details }: detailsTypes) {
  const { name, language, license, stargazers_count, topics } = details;
  const TextMessage = () => (
    <div className={style.text}>
      <p className={style.text_message}>Выберите репозитарий</p>
    </div>
  );

  if (Object.getOwnPropertyNames(details).length === 0) {
    return <TextMessage />;
  }

  return (
    <div className={style.details}>
      <h3 className={style.details_title}>{name}</h3>
      <div className={style.details_lang_star}>
        <div>
          {language && <Chip label={language} color="primary" size="medium" />}
        </div>
        <div className={style.details_star}>
          <Rating
            size="medium"
            max={1}
            precision={1}
            readOnly
            defaultValue={1}
          />
          <span className={style.details_star_text}>{stargazers_count}</span>
        </div>
      </div>

      {topics.length !== 0 && (
        <div className={style.details_topics}>
          {topics?.map((item: string, index: number) => {
            return (
              <Chip label={item} color="default" size="small" key={index} />
            );
          })}
        </div>
      )}

      <span className={style.details_license}>{license?.name}</span>
    </div>
  );
}
