import { MemberDTO } from "@/dtos/members/member";

export interface IMembersRepository {
  selectAll: () => Promise<MemberDTO[]>;
}

export interface IMembersController {
  getMembers: () => Promise<MemberDTO[]>;
}
