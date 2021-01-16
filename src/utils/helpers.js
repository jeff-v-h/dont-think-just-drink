// First param is always an object when the second param exists
export const createStylesArray = (mainStyle, flexibleStyles) => {
  if (flexibleStyles) {
    return Array.isArray(flexibleStyles) ? [mainStyle, ...flexibleStyles] : [mainStyle, flexibleStyles];
  }
  return Array.isArray(mainStyle) ? mainStyle : [mainStyle];
};
