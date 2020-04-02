import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {

  constructor(id: number) {
    const errorMessage : string = "User with id : " + id + " not found";
    super(errorMessage, HttpStatus.NOT_FOUND);
  }

}