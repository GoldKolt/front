export class User {
  id: string;
  email: string;
  password: string;
  roles: string[];

  constructor() {
    this.roles = [];
  }
}
