export class Account {
  username: string = '';
  password: string = '';
  isHr: boolean = false;

  constructor(username: string, password: string, isHr: boolean) {
    this.username = username;
    this.password = password;
    this.isHr = isHr;
  }
}
