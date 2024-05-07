import React from "react";

interface ICardPatient {
  title: string;
  imagePath: string;
  comment: string;
  onAction: any;
  constant: any;
  button: string;
}

const CardPatient = ({ imagePath, comment, title, constant, onAction, button }: ICardPatient) => {
  return (
    <div className="c-card__patient">
      <div className="c-card__patient--left">
        <img src={imagePath} alt={title} title={title} />
      </div>
      <div className="c-card__patient--right">
        <h4>{title}</h4>
        <div className="informations">
          <div className="informations--item">
            <i className="icofont-world"></i>
            <span>
              {constant?.country.key} <strong>{constant?.country.value}</strong>
            </span>
          </div>
          <div className="informations--item">
            <i className="icofont-doctor"></i>
            <span>
              {constant?.treatment.key} <strong>{constant?.treatment.value}</strong>
            </span>
          </div>
          <div className="informations--item">
            <i className="icofont-clock-time"></i>
            <span>
              {constant?.year.key} <strong>{constant?.year.value}</strong>
            </span>
          </div>
        </div>

        <p>{comment}</p>

        <div onClick={onAction} className="primary-btn">
          <a>{button}</a>
        </div>
      </div>
    </div>
  );
};

export default CardPatient;
