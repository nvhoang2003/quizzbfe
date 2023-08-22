export const userReducer = (user = {}, action) => {
    switch (action.type) {
      case "SETUSER":
        return user.name + action.payload.name;
      default:
        return user;
    }
  };
  
  export default userReducer;