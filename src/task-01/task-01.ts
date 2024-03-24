type Input = Array<any>;

export const arraySum = (input: Input): number => {
  let sum = 0;
  for (const vizsgalt of input) {
    if (typeof vizsgalt === 'number' && !isNaN(vizsgalt)) {
      sum += vizsgalt;
    } else if (Array.isArray(vizsgalt)) {
        if(!isNaN(arraySum(vizsgalt)))
          sum += arraySum(vizsgalt);
    }
  }
  return sum;
};
