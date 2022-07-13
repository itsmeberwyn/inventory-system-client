export class RequestParams {
  private endPoint: string;
  private body: any;
  private httpOptions: any;

  constructor() {
    this.endPoint = '';
    this.body = {};
    this.httpOptions = '';
  }

  public set HttpOptions(token: any) {
    this.httpOptions = token;
  }

  public set EndPoint(endPoint: string) {
    this.endPoint = endPoint;
  }

  public set Body(body: any) {
    this.body = body;
  }

  public get HttpOptions() {
    return this.httpOptions;
  }

  public get EndPoint() {
    return this.endPoint;
  }

  public get Body() {
    return this.body;
  }
}
