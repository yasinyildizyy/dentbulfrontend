import React from "react";
import { Abbreviation } from "utils";

interface ICardInfo {
  title: string;
  icon: string;
  content?: any;
}

const CardInfo = ({ icon, title, content }: ICardInfo) => {
  return (
    <div className="c-card__info">
      <div className="service-item">
        <div className="service-front">
          <i className={icon}></i>
          <h3>{title}</h3>
          {content?.length > 0 && <p>{Abbreviation.text(content, 250)}</p>}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
