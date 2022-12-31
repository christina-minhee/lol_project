import "./index.css";
import {useState, useEffect} from "react";


const Header = () => {
	const [searchWord, setSearchWord] = useState("");

	useEffect(() => {
		console.log("searchword change", searchWord);
	}, [searchWord])

	const onChangeSearch = (e) => {
		e.preventDefault();
		setSearchWord(e.target.value);
	}

	return (
		<div className="header">
			<div className="search_container">
				<div className="searchbar input-group mb-3">
					<input type="text" className="form-control" placeholder="소환사명,챔피언…" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
					<button className="btn btn-outline-secondary" type="button">.GG</button>
				</div>
			</div>
		</div>
	)
}

export default Header;