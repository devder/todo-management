export interface AppResponse<T> {
  data: T;
  status: boolean;
  message: string;
  errors?: Record<string, string>[];
}
