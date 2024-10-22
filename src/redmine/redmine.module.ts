import { Module } from '@nestjs/common';
import { RedmineService } from './redmine.service';

@Module({
  providers: [RedmineService]
})
export class RedmineModule {}
