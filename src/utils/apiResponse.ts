class ApiResponse {
  statusCode: number;
  message: string;
  data: any = null;
  success: boolean;

  constructor(statusCode: number, message: string = "", data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
