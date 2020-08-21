export const shallowEquals = (obj1, obj2) => {
  if (obj1 == null || obj2 == null) {
    if (obj1 == null && obj2 == null) return true;
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length === keys2.length) {
    for (let i = 0; i < keys1.length; i += 1) {
      const key = keys1[i];
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  }
  return false;
};

export const depsEquals = (deps1, deps2) => {
  if (deps1 === deps2) return true;
  // length must be equal
  for (const index in deps1) {
    if (deps1[index] !== deps2[index]) return false;
  }
  return true;
};

export const isFunction = fn => fn instanceof Function;
