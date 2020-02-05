 const createChuncksOfArray = (inputArray, chunckSize) => {
      const chunckedArrays = _.map(inputArray, (item, index) => (index % chunckSize === 0
        ? inputArray.slice(index, index + chunckSize)
        : null)).filter(item => item);
      return chunckedArrays;
    };

// eslint-disable-next-line consistent-return
export const getMapKeyByValue = (map, searchValue) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of map.entries()) {
    if (value === searchValue) { return key; }
  }
};

export const buildKey = (...params) => params.join('-');
