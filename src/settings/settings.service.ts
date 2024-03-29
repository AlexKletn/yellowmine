import { Injectable } from "@nestjs/common";
import { ProxyService } from "../proxy/proxy.service";

@Injectable()
export class SettingsService {
  constructor(private readonly proxyService: ProxyService) {
  }

  getSettings() {
    return this.proxyService.proxyAdmin("GET", "/workflows");
  }
}
