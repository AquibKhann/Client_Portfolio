import emailjs from '@emailjs/browser';

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export interface EmailData {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS configuration missing');
      return false;
    }

    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      message: data.message,
      to_name: data.to_name || 'Shaquib Khan',
      reply_to: data.from_email,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    return response.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};

export const initEmailJS = () => {
  if (publicKey) {
    emailjs.init(publicKey);
  }
};