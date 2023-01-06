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
