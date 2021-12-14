export const disabledButton = (
  itsNotTimeYet: boolean,
  eventIsOver: boolean,
) => {
  return itsNotTimeYet || eventIsOver;
};
