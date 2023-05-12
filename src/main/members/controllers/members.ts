import { MembersRepository } from "@/repositories/members/members";

export class MembersController {
  getMembers() {
    return new MembersRepository().selectAll();
  }
}
