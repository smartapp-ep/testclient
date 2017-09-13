import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public ApiIP: string = "http://13.54.151.152";
    public ApiPort: string = "";
    public Server: string = this.ApiIP+":"+this.ApiPort;
    public ApiUrl: string = "/api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
