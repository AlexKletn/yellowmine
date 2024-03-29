import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { WorkflowService } from "./workflow/workflow.service";
import { ProxyService } from "../proxy/proxy.service";
import { CustomFieldsService } from "./custom_fields/custom_fields.service";

@Module({
  imports: [HttpModule],
  providers: [SettingsService, WorkflowService, ProxyService, CustomFieldsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
