import {
  FETCH_DELEGATE_LIST_START,
  FETCH_DELEGATE_LIST_FINISH,
  UPDATE_DELEGATE_STATUS,
} from "./action";
import { findIndex } from "lodash";

export const initialState = {
  loading: false,
  data: null,
};

export default function (state, { type, payload }) {
  switch (type) {
    case UPDATE_DELEGATE_STATUS:
      console.log(state.data);
      console.log(payload);
      const aliasID = payload?.attributes?.aliasID;
      const index = findIndex(state.data, { id: Number(aliasID) });

      console.log("UPDATE_DELEGATE_STATUS.payload", payload);
      let newCheckins = null;

      const delegate = state.data[index];

      if (index != -1) {
        newCheckins = [...[payload], ...delegate?.attributes?.checkins.data];
      }
      if (newCheckins) {
        delegate.attributes.checkins.data = newCheckins;
      }

      state.data[index] = delegate;

      console.log("UPDATE_DELEGATE_STATUS.state", state);
      return { ...state };
    case FETCH_DELEGATE_LIST_START:
      return { ...state, loading: true };
    case FETCH_DELEGATE_LIST_FINISH:
      return { ...state, loading: false, data: payload };
    default:
      return { ...state };
  }
}
