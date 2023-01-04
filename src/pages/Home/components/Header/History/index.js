import classNames from "classnames/bind";
import styles from "./index.module.sass";
import { useEffect, useState } from "react";

const cn = classNames.bind(styles);

const History = ({ keywords, handleRemoveKeyword, handleSearch }) => {
  return (
    !!keywords.length && (
      <div className={cn("history_container")}>
        <div className={cn("history_title")}>
          <p>최근 검색어</p>
        </div>
        <ul className={cn("history_list_container")}>
          {keywords.map((keyword) => (
            <li key={keyword.id} className={cn("history_items")}>
              <p onClick={() => handleSearch(keyword.str)}>{keyword.str}</p>
              <div
                className={cn("close_btn")}
                onClick={() => handleRemoveKeyword(keyword.id)}
              >
                x
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default History;
