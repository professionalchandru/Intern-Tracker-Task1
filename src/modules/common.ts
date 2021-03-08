export interface createdBy {
  requestMethod: string;
  userAgent: string;
  remoteAddress: any;
  pathInfo: string;
  user: string;
}

export enum sortOrder {
  desc = -1,
  asc = 1,
}
