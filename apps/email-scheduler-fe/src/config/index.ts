export const apiEndpoints = {
  googleAuth: "/api/auth/google",
  templates: "/api/emails/templates",
  templateDetail: (id: string) => `/api/emails/templates/${id}`,
  campaigns: "/api/emails/campaigns",
  campaignDetail: (id: string) => `/api/emails/campaigns/${id}`,
  customers: "/api/emails/customers",
};
