'use client';

import { ChipsInput } from '@/components/chips-input';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobApplication } from '@/types/job-application';
import { jobApplication, jobCategory } from '@prisma/client';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateJobApplication } from './actions'; // Assume this function exists to handle updates

const emptyJobApplicationData = {
  categoryId: '',
  jobTitle: '',
  companyName: '',
  companySize: null,
  companyIndustry: null,
  location: null,
  workModel: null,
  skills: [],
  jobUrl: ''
};

const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const workModels = ['Remote', 'Hybrid', 'On-site'];

export function EditJobApplicationDialog({ jobApplication, categories, onDialogClose }: { jobApplication: jobApplication; categories: jobCategory[]; onDialogClose: () => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<JobApplication>({ ...emptyJobApplicationData, ...jobApplication });
  const [message, setMessage] = useState<Message | null>(null);

  const handleChange = (field: keyof JobApplication, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  async function handleUpdateJobApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedData = { ...data, id: jobApplication.id, kanbanBoardId: jobApplication.kanbanBoardId };
    const result = await updateJobApplication(updatedData);

    if (result.success) {
      await updateJobApplication(updatedData);
      toast.success('Job application updated successfully');

      onOpenChange(false);
    } else {
      setMessage({ error: result.error ?? 'Failed to update job application' });
      toast.error(result.error ?? 'Failed to update job application');
    }
  }

  function onOpenChange(open: boolean) {
    setIsOpen(open);

    if (!open) onDialogClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil />
          <span>Edit application</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogTitle>Edit Job Application</DialogTitle>
        <form onSubmit={handleUpdateJobApplication}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobCategory">Job Category</Label>
              <Select name="categoryId" value={data.categoryId} onValueChange={(categoryId) => handleChange('categoryId', categoryId)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select job category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.hexColor }} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div />
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input name="jobTitle" placeholder="Software Engineer" value={data.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input name="companyName" placeholder="Acme Inc." value={data.companyName} onChange={(e) => handleChange('companyName', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select name="companySize" value={data.companySize ?? ''} onValueChange={(value) => handleChange('companySize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyIndustry">Industry</Label>
              <Input name="companyIndustry" placeholder="e.g. Fintech, Healthcare, E-commerce" value={data.companyIndustry ?? ''} onChange={(e) => handleChange('companyIndustry', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input name="location" placeholder="San Francisco, CA" value={data.location ?? ''} onChange={(e) => handleChange('location', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workModel">Work Model</Label>
              <Select name="workModel" value={data.workModel ?? ''} onValueChange={(value) => handleChange('workModel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work model" />
                </SelectTrigger>
                <SelectContent>
                  {workModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input name="jobUrl" type="url" placeholder="https://example.com/job" value={data.jobUrl} onChange={(e) => handleChange('jobUrl', e.target.value)} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skills">Skills</Label>
              <input type="hidden" name="skills" value={data.skills} />
              <ChipsInput values={data.skills} onValuesChange={(newSkills) => setData((prev) => ({ ...prev, skills: newSkills }))} />
              <span className="text-xs font-medium text-muted-foreground">Press space, comma or enter to add a skill</span>
            </div>
          </div>

          <DialogFooter className="mt-6 flex w-full items-center gap-3">
            {message && <FormMessage className="w-full" message={message} />} {/* Display error message */}
            <Button className="ml-auto w-full sm:w-fit" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton className="w-full sm:w-fit" type="submit">
              Edit application
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
