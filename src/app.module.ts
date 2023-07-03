import { Module } from '@nestjs/common';
import { SolutionController } from './solution/solution.controller';
import { DemoController } from './demo/demo.controller';

@Module({
  imports: [],
  controllers: [SolutionController, DemoController],
  providers: [],
})
export class AppModule {}
