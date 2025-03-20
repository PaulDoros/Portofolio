import { Send, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import { Button } from "./ui/button";
import { EmailStatusModal } from "./email-status-modal";
import { emailConfig } from "~/config";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    isOpen: boolean;
    status: "success" | "error" | "sending";
    message: string;
  }>({
    isOpen: false,
    status: "success",
    message: "",
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailStatus({
      isOpen: true,
      status: "sending",
      message: "Please wait while we send your message...",
    });

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_name: "Paul Doros",
          reply_to: formData.email,
          to_email: emailConfig.recipientEmail,
          email: emailConfig.recipientEmail,
          subject: formData.subject,
          message: formData.message,
        },
        emailConfig.publicKey,
      );

      setEmailStatus({
        isOpen: true,
        status: "success",
        message:
          "Thank you for your message! I'll get back to you as soon as possible. In the meantime, feel free to connect with me on LinkedIn or GitHub.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setEmailStatus({
        isOpen: true,
        status: "error",
        message:
          "I apologize, but there was an error sending your message. Please try again later or reach out to me directly at dorospaul26@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className={className}>
        <h3 className="mb-6 text-xl font-semibold">Send Me a Message</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Subject of your message"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Your message"
                required
              ></textarea>
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>

      <EmailStatusModal
        isOpen={emailStatus.isOpen}
        onClose={() => setEmailStatus((prev) => ({ ...prev, isOpen: false }))}
        status={emailStatus.status}
        message={emailStatus.message}
      />
    </>
  );
}
