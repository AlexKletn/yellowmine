import { Injectable } from "@nestjs/common";
import { ProxyService } from "../../proxy/proxy.service";

@Injectable()
export class CustomFieldsService {
  constructor(private readonly proxyService: ProxyService) {
  }

  getIssues() {
    return this.proxyService.proxyAdmin("GET", "/custom_fields.json");
  }
}
