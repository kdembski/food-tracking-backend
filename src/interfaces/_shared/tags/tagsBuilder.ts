export interface ITagsBuilder<Filters> {
  build(filters: Filters): void;
}
