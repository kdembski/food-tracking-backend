export type RequestQueryData = {
  size?: string;
  page?: string;
  sortAttribute?: string;
  sortDirection?: string;
  searchPhrase?: string;
  tags?: string;
  members?: string;
  fromDate?: string;
  toDate?: string;
};

export interface IRequestQueryHelper {
  getQueryValues(): {
    size: number;
    page: number;
    sortAttribute: string;
    sortDirection: string;
    searchPhrase: string;
    tags: string;
    members?: number[];
    fromDate?: Date;
    toDate?: Date;
  };
}
