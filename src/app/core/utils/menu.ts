import { IMenu } from '../interfaces/menu.interface';

export const Menu: IMenu[] = [
  {
    description: '',
    childs: [
      {
        description: 'Inicio',
        icon: '',
        path: 'admin/home',
      },
      {
        description: 'Populares',
        icon: '',
        path: 'admin/popular-movie',
      },
    ],
  },
];
