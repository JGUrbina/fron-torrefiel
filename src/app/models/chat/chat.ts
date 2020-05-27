import { User } from '../user/user';

export class Chat {
  constructor(
    public user: User,
    public text: string,
    public images: [any],
  ){}
}
