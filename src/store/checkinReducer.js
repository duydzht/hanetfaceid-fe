import {
  FETCH_CHECKIN_LIST_START,
  FETCH_CHECKIN_LIST_FINISH,
  ADD_CHECKIN,
} from "./action";

export const initialState = {
  loading: false,
  data: null,
  current: null,
};

export default function (state, { type, payload }) {
  switch (type) {
    case ADD_CHECKIN: {
      return { ...state, current: payload };
    }
    case FETCH_CHECKIN_LIST_START:
      return { ...state, loading: true };
    case FETCH_CHECKIN_LIST_FINISH:
      return { ...state, loading: false, data: payload };
    default:
      return { ...state };
  }
}
