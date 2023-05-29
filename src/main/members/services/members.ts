import { MembersRepository } from "@/repositories/members/members";

export class MembersService {
  private repository: MembersRepository;

  constructor(repository = new MembersRepository()) {
    this.repository = repository;
  }

  getMembers() {
    return this.repository.selectAll();
  }
}
