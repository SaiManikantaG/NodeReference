 const createChuncksOfArray = (inputArray, chunckSize) => {
      const chunckedArrays = _.map(inputArray, (item, index) => (index % chunckSize === 0
        ? inputArray.slice(index, index + chunckSize)
        : null)).filter(item => item);
      return chunckedArrays;
    };
