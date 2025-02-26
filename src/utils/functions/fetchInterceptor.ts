import { api_basepath, session_cookie_name } from "@/utils/constants/env.ts";
import { redirect } from "@/i18n/routing";
import { cookies } from "next/headers";

import type { FetchErrorData, FetchSuccessData, FetchTypeData, TAsyncIncResolver, TIncResolver } from "@/types/commons.ts";

/**
 * Fetch interceptor
 * @param data Dynamic Data type check notation type @type FetchTypeData
 * @returns Intercepted Fetch @type TIncResolver
 */
export async function appCookieFetch<G>({ httpMethod = "GET", credentials, ...data }: FetchTypeData): TAsyncIncResolver<G> {
  let authError: boolean = false;
  let result: TIncResolver<G>;

  try {
    const hasAuth = credentials === "include" || credentials === "same-origin";
    const secureHeaderCookie = new Headers();

    if (hasAuth) {
      const cooki = (await cookies()).get(session_cookie_name);

      if (!cooki) authError = true;

      const { name, value } = cooki ?? {};

      secureHeaderCookie.append("Cookie", `${name}=${value}`);
    }

    if (data.extraHeaders) {
      data.extraHeaders.flatMap((x) => {
        for (const key in x) secureHeaderCookie.append(key, x[key]);
      });
    }

    const call = await fetch(
      api_basepath + data.uri,
      httpMethod === "GET"
        ? { headers: secureHeaderCookie, credentials }
        : {
            credentials,
            body: data.body,
            method: httpMethod,
            headers: secureHeaderCookie,
          }
    );

    if (call.status >= 200 && call.status < 300) {
      const totalResponse: FetchSuccessData<G> = await call.json();

      totalResponse["cookies"] = hasAuth ? call.headers.getSetCookie() : undefined;

      result = [totalResponse, undefined];
    } else {
      const { code, message }: FetchErrorData = JSON.parse(await call.text());
      result = [undefined, { message, code }];
    }
  } catch (_) {
    result = [undefined, { message: "Conexión Interrumpida", code: 900 }];
  }

  if (authError) redirect({ href: "/Home", locale: "en" });

  return result;
}
