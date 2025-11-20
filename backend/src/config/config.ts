export interface AuthConfig {
  clientId: string;
  authority: string;
  clientSecret: string;
}

export interface ZendeskConfig {
  subdomain: string;
  email: string;
  token: string;
}

export const authConfig: AuthConfig = {
  clientId: process.env.AZURE_CLIENT_ID || '',
  authority: process.env.AZURE_AUTHORITY || '',
  clientSecret: process.env.AZURE_CLIENT_SECRET || '',
};

export const zendeskConfig: ZendeskConfig = {
  subdomain: process.env.ZENDESK_SUBDOMAIN || '',
  email: process.env.ZENDESK_EMAIL || '',
  token: process.env.ZENDESK_TOKEN || '',
};
