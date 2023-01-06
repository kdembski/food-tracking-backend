import { UserDTO } from "@/dtos/user";

export interface IUsersRepository {
  selectById: (id: number) => Promise<UserDTO>;
}

export interface IUsersController {
  login: (password: string) => Promise<string>;
  getDefaultUser: () => Promise<UserDTO>;
}
