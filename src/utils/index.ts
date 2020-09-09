export const on = (target, event, ...args) => {
  target.addEventListener(event, ...args);
  return () => off(target, event, ...args);
};

export const off = (target, event, ...args) =>
  target.removeEventListener(event, ...args);
