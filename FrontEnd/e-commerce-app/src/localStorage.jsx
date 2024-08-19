export const saveToLocalStorage = (state) => {
  try {
    const { userId, accessToken } = state.userReducer;
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
      accessToken,
      cartItems = [],
      grossTotal,
    } = JSON.parse(serializedState);

    return {
      userReducer: { userId, accessToken },
      cartReducer: { cartItems, grossTotal },
    };
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};
