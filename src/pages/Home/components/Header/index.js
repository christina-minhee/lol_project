import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSummoner } from "../../../../store";

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  const onClickSearch = (e) => {
    dispatch(updateSummoner(searchInput));
  };

  return (
    <div className="header">
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
          onClick={onClickSearch}
        >
          .GG
        </button>
      </div>
      {/* TO DO recent search */}
      {/* TO DO search result */}
    </div>
  );
};

export default Header;
