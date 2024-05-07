import Link from "next/link";
import React from "react";
import { Abbreviation } from "utils";

interface ICardTreatment {
  title: string;
  imagePath: string;
  content: string;
  button: string;
  slug: string;
}

const CardTreatment = ({ title, content, imagePath, button, slug }: ICardTreatment) => {
  return (
    <div className="c-card__treatment">
      <div className="blog-item">
        <div className="blog-top">
          <Link href={slug}>
            <a>
              <img src={imagePath} alt={title} title={title} />
            </a>
          </Link>
        </div>
        <div className="blog-bottom">
          <h3>
            <Link href={slug}>
              <a>{title}</a>
            </Link>
          </h3>
          <p>{Abbreviation.text(content, 114)}</p>
          <ul>
            <li>
              <Link href={slug}>
                <a>
                  {button} <i className="icofont-long-arrow-right"></i>
                </a>
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardTreatment;
