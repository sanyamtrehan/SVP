export interface MovieInfo {
  name: string;
  path: string;
  type: 'folder' | 'file';
  icon: string | null;
  children: MovieInfo[] | null;
  thumbnail: string | null;
}
