export type ListConfig<Filters> = {
  sortAttribute: string;
  sortDirection: string;
  size: number;
  page: number;
  offset: number;
  filters: Filters;
};
