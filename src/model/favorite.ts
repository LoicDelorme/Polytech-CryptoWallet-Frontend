import { Cryptocurrency } from './cryptocurrency';
import { User } from './user';

export class Favorite {
  constructor(private cryptocurrency:Cryptocurrency, private user:User){
    this.cryptocurrency = cryptocurrency;
    this.user = user;
  }
}
