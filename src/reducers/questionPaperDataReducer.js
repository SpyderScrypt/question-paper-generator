import { SEND_DATA } from "../actions/sendData";

const initialState = {
  data: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_DATA:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
}
