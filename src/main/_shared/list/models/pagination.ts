export class Pagination {
  private currentPage: number;
  private totalPages: number;
  private firstRecord: number;
  private lastRecord: number;
  private totalRecords: number;

  constructor(
    listCount: number,
    page: number,
    size: number,
    dataLength: number,
    offset: number
  ) {
    this.currentPage = page;
    this.totalPages = Math.ceil(listCount / size);
    this.firstRecord = offset + 1;
    this.lastRecord = offset + dataLength;
    this.totalRecords = listCount;
  }
}
