/** Fetch interceptor parameter data type */
export type FetchTypeData = {
  body?: any;
  uri: string;
  extra?: ResponseInit;
  credentials?: RequestCredentials;
  extraHeaders?: Array<{ [key: string]: string }>;
  httpMethod?: "PUT" | "PATCH" | "DELETE" | "POST" | "GET";
};

export type BaseResponseType = {
  path: string;
  message: string;
  timeStamp: string;
  status: number | string;
};

export type FetchErrorData = BaseResponseType & {
  data: null;
  message: string;
  code: number | string;
};

export type FetchSuccessData<G> = BaseResponseType & {
  cookies?: Array<string>;
  data: G;
};

export type ErrorObj = {
  message: string;
  code: string | number;
};

export type TIncResolver<G> = [FetchSuccessData<G> | undefined, FetchErrorData | ErrorObj | undefined];

export type TAsyncIncResolver<G> = Promise<TIncResolver<G>>;

export type sameSiteCookieProp = "lax" | "strict" | "none" | boolean | undefined;
export type priorityCookieProp = "low" | "medium" | "high" | undefined;

export type ParsedCookie = {
  name: string;
  value: string;
  domain: string;
  expires: Date;
  httpOnly: boolean;
  maxAge: number;
  path: string;
  priority: priorityCookieProp;
  sameSite: sameSiteCookieProp;
  secure: boolean;
};
