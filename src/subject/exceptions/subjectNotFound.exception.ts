import { HttpException, HttpStatus } from '@nestjs/common';

export class SubjectNotFoundException extends HttpException {


  constructor(id: number) {
    const errorMessage : string = "Subject with id : " + id + " not found";
    super(errorMessage, HttpStatus.NOT_FOUND);
  }

}