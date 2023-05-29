import { MemberCalendarItemsRepository } from "@/repositories/members/memberCalendarItems";
import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";
import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";
import { MemberCalendarItemDTO } from "@/dtos/members/memberCalendarItem";
import { MemberCalendarItemMapper } from "@/mappers/members/memberCalendarItem";

export class MemberCalendarItemsService extends DbEntityService<
  MemberCalendarItem,
  MemberCalendarItemDTO
> {
  protected repository: MemberCalendarItemsRepository;
  protected mapper: MemberCalendarItemMapper;

  constructor(
    repository = new MemberCalendarItemsRepository(),
    mapper = new MemberCalendarItemMapper()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
  }

  async getByItemId(itemId: number) {
    const results = await this.repository.selectByItemId(itemId);

    return results.map((result) => new MemberCalendarItem(result));
  }

  async getByMemberId(memberId: number) {
    const results = await this.repository.selectByMemberId(memberId);

    return results.map((result) => new MemberCalendarItem(result));
  }

  deleteByMemberIdAndItemId(itemId: number, memberId: number) {
    return this.repository.deleteByMemberIdAndItemId(itemId, memberId);
  }
}
