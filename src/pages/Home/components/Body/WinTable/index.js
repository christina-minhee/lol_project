import "./index.css";
import {useState} from "react";

const WinTable = () => {
    const [selected, setSelected] = useState("champion");

    return (
        <>
            <div className="wintable">
                <div className="wintable_tabs">
                    <div
                        className={`wintable_tab ${selected !== "champion" && "inactive"}`}
                        onClick={() => setSelected("champion")}
                    >챔피언 승률</div>
                    <div
                        className={`wintable_tab ${selected === "champion" && "inactive"}`}
                        onClick={() => setSelected("seven")}
                    >7일간 랭크 승률</div>
                </div>
                <div className="wintable_contents">

                </div>
            </div>
        </>
    )
}

export default WinTable;