import { MembersRepository } from "@/repositories/members/members";

export class MembersService {
  getMembers() {
    return new MembersRepository().selectAll();
  }
}
