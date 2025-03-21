import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "../MainApp/Navbar/index.tsx";
import { type ReactNode } from "react";

import type { IRSC } from "@/types/components";

export default async function MainAppWrapper({ children }: IRSC): Promise<ReactNode> {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
