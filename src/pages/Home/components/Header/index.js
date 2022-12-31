import "./index.css";
import {useState, useEffect, useCallback} from "react";
// import {useQueryClient}from "@tanstack/react-query";
import { useGetPlayerResult } from "../../../../query/player";
import {useDispatch} from "react-redux";
import { updateSummoner } from "../../../../store";


const Header = () => {
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState("");
	const [searchWord, setSearchWord] = useState("");
	// const queryClient = useQueryClient();
	// useEffect(() => {
	// 	console.log("searchword change", searchWord);
	// }, [searchWord])

	const onChangeSearch = e => {
			console.log("searchword changing");
      setSearchInput(e.target.value);
	}

	const onClickSearch = e => {
		dispatch(updateSummoner(searchInput))
}

	return (
		<div className="header">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						value={searchInput}
						onChange={onChangeSearch}
						placeholder="소환사명,챔피언…"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						/>
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={onClickSearch}
					>.GG</button>
				</div>
				{/* TO DO recent search */}
				{/* TO DO search result */}
		</div>
	)
}

export default Header;