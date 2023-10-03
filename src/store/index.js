import React, { useReducer, useMemo } from "react";
import delegateReducer, {
  initialState as delegateInitState,
} from "./delegateReducer";
import checkinReducer, {
  initialState as checkinInitState,
} from "./checkinReducer";
import authReducer, { initialState as authInitialState } from "./authReducer";

function combineReducers(slices) {
  return (state, action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );
}

export const StoreContext = React.createContext();

const rootReducer = combineReducers({
  delegate: delegateReducer,
  checkin: checkinReducer,
  auth: authReducer,
});

const initialState = {
  delegate: delegateInitState,
  checkin: checkinInitState,
  auth: authInitialState,
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo(() => [state, dispatch], [state]);
  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};
