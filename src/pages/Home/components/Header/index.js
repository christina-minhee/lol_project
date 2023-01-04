import "./index.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSummoner } from "../../../../store";
import History from "./History";

const Header = () => {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const res = localStorage.getItem("keywords") || "[]";
    setKeywords(JSON.parse(res));
  }, []);

  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchInput);
    }
  };

  const handleAddKeyWord = (str) => {
    const newWord = {
      id: Date.now(),
      str: str,
    };
    setKeywords([newWord, ...keywords]);
  };

  const handleRemoveKeyword = (id) => {
    const nextWord = keywords.filter((word) => {
      return word.id != id;
    });
    setKeywords(nextWord);
  };

  const handleSearch = (input) => {
    dispatch(updateSummoner(input));
    handleAddKeyWord(input);
  };

  return (
    <div className="header">
      <div className="search_bar_wrap">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchInput}
            onChange={onChangeSearch}
            onKeyPress={handleOnKeyPress}
            placeholder="소환사명,챔피언…"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => handleSearch(searchInput)}
          >
            .GG
          </button>
        </div>
        <History
          keywords={keywords}
          handleSearch={handleSearch}
          handleRemoveKeyword={handleRemoveKeyword}
        />
      </div>
    </div>
  );
};

export default Header;
