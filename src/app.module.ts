import { Module } from '@nestjs/common';
import { SolutionController } from './solution/solution.controller';

@Module({
  imports: [],
  controllers: [SolutionController],
  providers: [],
})
export class AppModule {}
