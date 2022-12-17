import { IMembersController } from "@/interfaces/members/members";
import { MembersRepository } from "@/repositories/members/members";

export class MembersController implements IMembersController {
  getMembers() {
    return new MembersRepository().selectAll();
  }
}
