import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  /*let sum = 0;
  for(const i of games) {
    let red = 0, green = 0, blue = 0;
    for(const j of i.draws) {
        red = Math.max(red, j.red??0);
        green = Math.max(green, j.green??0);
        blue = Math.max(blue, j.blue??0);
    }
    sum += (red*green*blue); 
  }
  return sum;
};
Átírva reduce függvénybe: 
*/
  const sum = games.reduce((totalSum, currentGame) => {
    const maxValues = currentGame.draws.reduce((max, draw) => {
      const red = draw.red ?? 0;
      const green = draw.green ?? 0;
      const blue = draw.blue ?? 0;
      return {
        red: Math.max(max.red ??0, red),
        green: Math.max(max.green??0, green),
        blue: Math.max(max.blue??0, blue)
      };
    }, { red: 0, green: 0, blue: 0 });
    const gameSum = (maxValues.red ?? 0) * (maxValues.green ?? 0) * (maxValues.blue ?? 0);
    return totalSum + gameSum;
  }, 0);
  return sum;
};
