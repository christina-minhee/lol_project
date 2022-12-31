import "./index.css";
import {useState, useEffect} from "react";
import {useGetPlayerResult} from "../../../../../query/player";
import {useSelector} from "react-redux";

const Profile = ({summonerData}) => {

	return (
		<div className="profile">
            {/* TO DO button:? list */}
            <div className="profile_card">
                <img className="image_border" src={summonerData.profileBorderImageUrl} alt="user_profle_img_border" />
                <div className="image_container">
                    <img className="image_profile" src={summonerData.profileImageUrl} alt="user_profile_img" />    
                </div>
                <div className="profile_detail">
                    <p className="player_id">{summonerData.name}</p>
                    <span className="player_title">
                        레더 랭킹
                        <span className="player_ladder_ranking">
                            {summonerData.ladderRank.rank}
                        </span>
                        위 (상위 {summonerData.ladderRank.rankPercentOfTop}%)
                    </span>
                </div>
            </div>

		</div>
	)
}

export default Profile;