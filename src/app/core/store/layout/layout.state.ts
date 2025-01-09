import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { ShowSideBarAction } from './layout.actions';

export interface LayoutStateModel {
  show: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    show: false,
  },
})

@Injectable()
export class LayoutState {
  @Selector() static showMenu(state: LayoutStateModel): boolean {
    return state?.show;
  }

  constructor() {}

  @Action(ShowSideBarAction)
  ShowSideBarAction(
    ctx: StateContext<LayoutStateModel>,
    { payload }: ShowSideBarAction
  ) {
    ctx.patchState({
      show: payload,
    });
  }
}
