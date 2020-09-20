const userReducer = (state=null, action) => {
    return action.payload || state;
}

export default userReducer;