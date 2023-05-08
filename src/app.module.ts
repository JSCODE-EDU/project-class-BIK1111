import { Module } from '@nestjs/common';
import { BoardModule } from './boards/board.module';

@Module({
  imports: [BoardModule],

})
export class AppModule {}
