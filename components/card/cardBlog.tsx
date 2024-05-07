import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Abbreviation } from "utils";

interface ICardBlog {
  title: string;
  imagePath: string;
  content: string;
  writeAt: string;
  button: string;
  slug: string;
}

const CardBlog = ({ title, content, imagePath, button, writeAt, slug }: ICardBlog) => {
  return (
    <div className="c-card__blog">
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
              <a>{Abbreviation.text(title, 60)}</a>
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
            <li>
              <i className="icofont-calendar"></i>
              {dayjs(writeAt).format("DD.MM.YYYY")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
