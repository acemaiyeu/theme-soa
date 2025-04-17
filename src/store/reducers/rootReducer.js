const initState = {
  cart: { data: null },
  profile: { data: null },
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      let users = state.users;
      users = users.filter((user) => user.id !== action.payload.id);
      return {
        ...state,
        users,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
