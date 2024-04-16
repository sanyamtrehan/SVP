export interface MovieInfo {
  name: string;
  type: 'file' | 'folder';
  path: string;
  thumbnail: string | null;
  icon: string | null;
  setParentIcon: boolean;
  children: MovieInfo[] | null;
}
