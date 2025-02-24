import { type RequestConfig, getRequestConfig } from "next-intl/server";
import { type Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }): Promise<RequestConfig> => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) locale = routing.defaultLocale;
  return { locale, messages: (await import(`../../I18n/${locale}.json`)).default };
});
