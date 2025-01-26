import { z } from 'zod';

export const jobApplicationSchema = z.object({
  categoryId: z.string().uuid().min(1, 'Category id is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.string().nullable(),
  companyIndustry: z.string().nullable(),
  location: z.string().nullable(),
  workModel: z.string().nullable(),
  skills: z.array(z.string()).default([]),
  jobUrl: z.string().url('Invalid URL format')
});

export type JobApplication = z.infer<typeof jobApplicationSchema>;
