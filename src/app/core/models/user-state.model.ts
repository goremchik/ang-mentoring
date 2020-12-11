import { IUser } from './user.model';

export interface IUserState {
    profile: IUser,
    error: string,
}
