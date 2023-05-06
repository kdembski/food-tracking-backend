export interface ITagsBuilder<Filters> {
  build(filters: Filters): void;
}

export interface ITagsRepository<Filters> {
  selectTags: (filters: Filters) => Promise<string[]>;
}
