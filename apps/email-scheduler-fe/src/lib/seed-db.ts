import "server-only";
import { faker } from "@faker-js/faker";
import { EmailTemplateCreatePayload } from "@/schemas/email-templates";
import { db } from "./db";
import { NextRequest } from "next/server";

const createEmailTemplateHtml = (content: string) => `
  <div>
    <p>Hi, {{first_name}}, </p>
    <p>This is a test email for your company {{company_name}}</p>
    <p>${content}</p>
  </div>
`;

export async function seedDb(request: NextRequest, userId: string) {
  const emailTemplates: EmailTemplateCreatePayload[] = Array.from({
    length: 100,
  }).map((_, i) => ({
    name: faker.company.buzzPhrase(),
    subject: faker.hacker.phrase(),
    body: createEmailTemplateHtml(faker.lorem.paragraphs()).trim(),
  }));
  await db().emailTemplate.deleteMany({
    where: {
      userId,
    },
  });
  await db().emailTemplate.createMany({
    data: emailTemplates.map((emailTemplate) => ({
      ...emailTemplate,
      userId,
    })),
  });
}
