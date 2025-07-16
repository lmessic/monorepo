function flat(deep = 1) {
  let arr = this;

  if (deep === 0) return arr;

  return arr.reduce((acc, curr) => {
    return Array.isArray(curr) ? [...acc, ...curr.flat(deep - 1)] : [...acc, curr]
  }, [])
}
