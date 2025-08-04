
const defaultMessage = "";

const messageReducer = (state:String=defaultMessage, action:any) => {
  switch(action.type) {
    case "SET_MESSAGE":
      return action?.payload;
    case "RESET_MESSAGE":
      return defaultMessage;
    default:
      return state;
  }
};

export const setMessage = (input:String) => {
  return {
    type: "SET_MESSAGE",
    payload: input
  };
};

export const resetMessage = () => {
  return {
    type: "RESET_MESSAGE",
  };
};

export default { message: messageReducer };