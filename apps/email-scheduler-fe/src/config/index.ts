export const apiEndpoints = {
  googleAuth: "/api/auth/google",
  templates: "/api/emails/templates",
  templateDetail: (id: string) => `/api/emails/templates/${id}`,
  campaigns: "/api/emails/campaigns",
  campaignDetail: (id: string) => `/api/emails/campaigns/${id}`,
  customers: "/api/emails/customers",
};
export const appRoutes = {
  templates: {
    root: "/emails/templates",
    list: "/emails/templates/list",
    add: "/emails/templates/add",
    edit: (id: string) => `/emails/templates/${id}/edit`,
    sendEmail: (id: string) => `/emails/templates/${id}/send-email`,
  },
  campaigns: {
    root: "/emails/campaigns",
    list: "/emails/campaigns/list",
    add: "/emails/campaigns/add",
    edit: (id: string) => `/emails/campaigns/${id}/edit`,
  },
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
};
