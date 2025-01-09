export interface IMenu {
  description: string;
  childs: IChildMenu[];
}

export interface IChildMenu {
  path: string;
  description: string;
  icon: string;
}
