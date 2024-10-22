import { Module } from '@nestjs/common';
import { RedmineConfigController } from './redmine-config.controller';

@Module({
  controllers: [
    RedmineConfigController,
  ],
})
export class RedmineConfigModule {}
