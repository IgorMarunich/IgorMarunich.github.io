export const newCounter = () => {
  let currentCount = 2;
  
  return function() {
    return currentCount++;
  };
};
