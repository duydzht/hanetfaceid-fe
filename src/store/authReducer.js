import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./action";

export const initialState = {
  user: null,
};

export default function (state, { type, payload }) {
  console.log("type", type);
  console.log("payload", payload);
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, user: payload };
    }
    case LOGOUT_SUCCESS:
      return { ...state, user: null };
    default:
      return { ...state };
  }
}
