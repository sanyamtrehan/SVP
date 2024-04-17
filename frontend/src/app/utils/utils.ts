import { MovieInfo } from '../movies';

export const findMovieInfoById = (data: MovieInfo[], id: string) => {
  let resData = null;
  let traversalData = data;
  const ids = id.split('/');
  for (const id of ids) {
    const found = traversalData.find(
      (item: any) => item.name.toLowerCase() === id.toLocaleLowerCase()
    );
    if (found) {
      resData = found;
      traversalData = found.children || [];
    } else {
      return null; // Return null if any segment is not found
    }
  }
  return resData;
};
