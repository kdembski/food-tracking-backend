export interface UserDTO {
  id: number;
  password: string;
  accessToken: string;
}

export interface IUsersRepository {
  selectById: (id: number) => Promise<UserDTO>;
}

export interface IUsersController {
  login: (password: string) => Promise<string>;
  getDefaultUser: () => Promise<UserDTO>;
}
