export const checkWindowWidth = (windowWidth, stateValue, stateFunction) => {
  if (windowWidth >= 768) {
    stateFunction({...stateValue, initialCount: 16, additionalCount: 4});
  } else {
    stateFunction({...stateValue, initialCount: 5, additionalCount: 2});
  }
};