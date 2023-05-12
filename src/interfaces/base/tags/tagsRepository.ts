export interface ITagsRepository<Filters> {
  selectTags: (filters: Filters) => Promise<string[]>;
}
