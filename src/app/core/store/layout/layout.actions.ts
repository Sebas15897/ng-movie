export class ShowSideBarAction {
  static readonly type = '[Layout] SidebarShow';
  constructor(public payload: boolean) {}
}
