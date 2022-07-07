import { environment } from "../../environments/environment";

const player = 'https://skystudioapps.com/bs-viewer/?noProxy=true&url=';


class ProxyApiService {
  getPlayerLink(id: string): string {
    return player + this.proxySource(id);
  }

  private proxySource(id: string): string {
    return environment.apiHttps + 'proxy/source/?name=' + id
  }
}

export const proxyApiService = new ProxyApiService();
