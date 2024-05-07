import Link from "next/link";
import React from "react";

const Breadcrumb = ({ pageTitle, homePageUrl, homePageText, activePageText, bgImage }: any) => {
  return (
    <div className="c-breadcrumb">
      <div className={`page-title-area ${bgImage}`}>
        <div className="d-table">
          <div className="d-table-cell">
            <div className="page-title-item">
              <h2>{pageTitle}</h2>
              <ul>
                <li>
                  <Link href={homePageUrl}>
                    <a>{homePageText}</a>
                  </Link>
                </li>
                <li className="active">{activePageText}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
