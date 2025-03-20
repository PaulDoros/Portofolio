import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { dirname } from "path";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Running env replacement:");
console.log(
  `EMAILJS_PUBLIC_KEY: ${process.env.EMAILJS_PUBLIC_KEY || "NOT FOUND"}`,
);
console.log(
  `EMAILJS_SERVICE_ID: ${process.env.EMAILJS_SERVICE_ID || "NOT FOUND"}`,
);
console.log(
  `EMAILJS_TEMPLATE_ID: ${process.env.EMAILJS_TEMPLATE_ID || "NOT FOUND"}`,
);
console.log(`RECIPIENT_EMAIL: ${process.env.RECIPIENT_EMAIL || "NOT FOUND"}`);

// Read the original file
const configPath = path.join(__dirname, "../app/config.ts");
let configContent = fs.readFileSync(configPath, "utf8");

// Replace placeholders with environment variables
configContent = configContent.replace(
  "___EMAILJS_PUBLIC_KEY___",
  process.env.EMAILJS_PUBLIC_KEY || "",
);
configContent = configContent.replace(
  "___EMAILJS_SERVICE_ID___",
  process.env.EMAILJS_SERVICE_ID || "",
);
configContent = configContent.replace(
  "___EMAILJS_TEMPLATE_ID___",
  process.env.EMAILJS_TEMPLATE_ID || "",
);
configContent = configContent.replace(
  "dorospaul26@gmail.com",
  process.env.RECIPIENT_EMAIL || "dorospaul26@gmail.com",
);

// Write the modified content back
fs.writeFileSync(configPath, configContent);
console.log("Environment variables replaced successfully.");
