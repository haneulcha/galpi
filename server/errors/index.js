class HttpError extends Error {
  status;
}

export class BadRequest extends HttpError {
  constructor(message = "잘못된 요청입니다 \n Bad Request") {
    super(message);
    this.status = 400;
  }
}

export class Unauthorized extends HttpError {
  constructor(message = "권한이 없습니다 \n Unauthorized") {
    super(message);
    this.status = 401;
  }
}
