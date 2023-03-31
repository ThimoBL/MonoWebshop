export interface ApiMetaInfo {
  status: number;
  message: string;
  count: number
}

export interface ApiResponse<T> {
  result?: T[] | T
  info: ApiMetaInfo
}
