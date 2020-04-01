import { HttpException } from '@nestjs/common';

export class EmailExistsException extends HttpException {

  constructor(email: string, status: number) {
    const errorMessage : string = email + " already exists";
    super(errorMessage, status);
  }

}