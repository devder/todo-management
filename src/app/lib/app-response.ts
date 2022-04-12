export interface AppResponse<T> {
  data: T;
  status: boolean;
  message: string;
}
