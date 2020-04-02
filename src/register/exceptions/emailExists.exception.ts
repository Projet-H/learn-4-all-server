import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExistsException extends HttpException {

  constructor(email: string) {
    const errorMessage : string = email + " already exists";
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }

}