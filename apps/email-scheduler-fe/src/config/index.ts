export const apiEndpoints = {
  googleAuth: "/api/auth/google",
  templates: {
    get: "/api/emails/templates",
    post: "/api/emails/templates",
    detail: (id: string) => `/api/emails/templates/${id}`,
    delete: (id: string) => `/api/emails/templates/${id}`,
    patch: (id: string) => `/api/emails/templates/${id}`,
  },
  campaigns: {
    get: "/api/emails/campaigns",
    post: "/api/emails/campaigns",
    detail: (id: string) => `/api/emails/campaigns/${id}`,
    delete: (id: string) => `/api/emails/campaigns/${id}`,
    patch: (id: string) => `/api/emails/campaigns/${id}`,
  },
  customers: {
    get: "/api/emails/customers",
    post: "/api/emails/customers",
    detail: (id: string) => `/api/emails/customers/${id}`,
    delete: (id: string) => `/api/emails/customers/${id}`,
    patch: (id: string) => `/api/emails/customers/${id}`,
  },
  sendEmail: "/api/emails/send-email",
  userMe: "/api/users/me",
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
