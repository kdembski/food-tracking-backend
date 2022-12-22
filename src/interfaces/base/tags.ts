import { RequestQueryData } from "../helpers/requestQuery";

export type Tag = {
  name: string;
  count: number;
};

export interface ITags {
  loadTags: (query: RequestQueryData) => void;
}
