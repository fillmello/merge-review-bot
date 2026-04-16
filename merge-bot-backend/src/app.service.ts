import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postRequest(): string {
    return 'Pull Request Recebido com sucesso';
  }
}
