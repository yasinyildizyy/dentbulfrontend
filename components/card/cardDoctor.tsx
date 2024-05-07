import React from "react";

interface ICardDoctor {
  title: string;
  fullName?: any;
  photoUrl: any;
}

const CardDoctor = ({ title, fullName, photoUrl }: ICardDoctor) => {
  return (
    <div className="c-card__doctor">
      <div className="doctor-item">
        <div className="doctor-top">
          <img src={photoUrl} alt={fullName} title={fullName} />
        </div>
        <div className="doctor-bottom">
          <h3>
            <a>{fullName}</a>
          </h3>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDoctor;
