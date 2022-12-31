import summonerReducer, {
    updateSummoner
} from "./summonerSlice";
import {configureStore} from "@reduxjs/toolkit";


export default configureStore({
    reducer: {
      summoner: summonerReducer,
    }
});
  
  export {
   summonerReducer
  };

  export {
    updateSummoner
  };