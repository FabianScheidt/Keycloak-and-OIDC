import { Controller, Get } from '@nestjs/common';

@Controller('solution')
export class SolutionController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
