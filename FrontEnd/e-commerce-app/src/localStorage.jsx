export const saveToLocalStorage = (state) => {
  try {
    const { userId, accessToken, isLogin } = state.userReducer;
    const { cartItems, grossTotal } = state.cartReducer;

    const serializedState = JSON.stringify({
      userId,
      accessToken,
      cartItems,
      grossTotal,
    });

    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.warn("Could not save state", e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;

    const {
      userId,
      isLogin,
      accessToken,
      cartItems = [],
      grossTotal,
    } = JSON.parse(serializedState);

    return {
      userReducer: { userId, accessToken, isLogin },
      cartReducer: { cartItems, grossTotal },
    };
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};
