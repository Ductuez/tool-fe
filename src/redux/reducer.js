// Chung
import { reducer as dangNhapReducer } from "./dangNhap";
import { reducer as truyCapValidCodeReducer } from "./truyCapValidCode";
import { reducer as truyCapLogintk88Reducer } from "./truyCapLogintk88";
import { reducer as userProfileReducer } from "./userProfile";
import { reducer as taoBotReducer } from "./taoBot";
import { reducer as listBotReducer } from "./listBot";
import { reducer as startBotReducer } from "./startBot";
import { reducer as choiThuReducer } from "./choiThu";
import { reducer as listDsBetReducer } from "./listDsBet";
import { reducer as xoaBotReducer } from "./xoaBot";
import { reducer as dangKyReducer } from "./dangKy";
import { reducer as dangXuatReducer } from "./dangXuat";
import { reducer as ngungBotReducer } from "./ngungBot";
import { reducer as capNhatToken88Reducer } from "./capNhatToken88";

const reducers = [
  // Chung
  dangNhapReducer,
  truyCapValidCodeReducer,
  truyCapLogintk88Reducer,
  userProfileReducer,
  taoBotReducer,
  listBotReducer,
  startBotReducer,
  listDsBetReducer,
  choiThuReducer,
  xoaBotReducer,
  dangKyReducer,
  dangXuatReducer,
  ngungBotReducer,
  capNhatToken88Reducer,
];

export default function reducer(state = {}, action) {
  let newState;

  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
