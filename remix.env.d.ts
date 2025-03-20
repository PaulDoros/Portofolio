/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare module NodeJS {
  interface ProcessEnv {
    EMAILJS_SERVICE_ID: string;
    EMAILJS_TEMPLATE_ID: string;
    EMAILJS_PUBLIC_KEY: string;
  }
}
