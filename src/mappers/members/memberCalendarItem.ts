import { IMapper } from "@/interfaces/_shared/mapper";
import { MemberCalendarItemDTO } from "@/dtos/members/memberCalendarItem";
import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";

export class MemberCalendarItemMapper
  implements IMapper<MemberCalendarItem, MemberCalendarItemDTO>
{
  toDTO(model: MemberCalendarItem) {
    return {
      id: model.id,
      itemId: model.itemId,
      memberId: model.memberId,
    };
  }

  toDomain(dto: MemberCalendarItemDTO) {
    return new MemberCalendarItem(dto);
  }
}
