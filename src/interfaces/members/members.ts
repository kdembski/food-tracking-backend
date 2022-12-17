export type MemberDTO = {
  id?: number;
  name?: string;
};

export interface IMembersRepository {
  selectAll: () => Promise<MemberDTO[]>;
}

export interface IMembersController {
  getMembers: () => Promise<MemberDTO[]>;
}
