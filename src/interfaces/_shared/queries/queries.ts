import { Field } from "@/queries/_shared/models/field";
import { Join } from "@/queries/_shared/models/join";
import { WheresCollectionItems } from "@/types/_shared/queries";

export interface IQueries {
  getSelect(config: {
    fields?: Field[];
    joins?: Join[];
    wheres?: WheresCollectionItems[];
  }): string;

  getSelectOptions(labelField: string): string;

  getSelectById(config: {
    fields?: Field[];
    joins?: Join[];
    wheres?: WheresCollectionItems[];
    id?: string;
  }): string;

  getInsert(fields: string[]): string;

  getUpdate(fields: string[]): string;

  getDelete(): string;
}
