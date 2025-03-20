// This file contains client-side configuration using environment variables

interface EnvVars {
  EMAILJS_PUBLIC_KEY?: string;
  EMAILJS_SERVICE_ID?: string;
  EMAILJS_TEMPLATE_ID?: string;
  RECIPIENT_EMAIL?: string;
  [key: string]: string | undefined;
}

const envVars: EnvVars =
  typeof process !== "undefined" && process.env ? process.env : {};

export const emailConfig = {
  publicKey: envVars.EMAILJS_PUBLIC_KEY,
  serviceId: envVars.EMAILJS_SERVICE_ID,
  templateId: envVars.EMAILJS_TEMPLATE_ID,
  recipientEmail: envVars.RECIPIENT_EMAIL,
};
