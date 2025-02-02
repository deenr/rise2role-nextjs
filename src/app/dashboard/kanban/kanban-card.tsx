'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { jobApplication, jobCategory } from '@prisma/client';
import { Building2, ExternalLink, Globe2, MapPin, MoreVertical, Users } from 'lucide-react';
import { useState } from 'react';
import { DeleteJobApplicationButton } from './delete-job-application-button';
import { EditJobApplicationDialog } from './edit-job-application-dialog';

export function KanbanCard({ color, jobApplication, categories }: { color: string; jobApplication: jobApplication; categories: jobCategory[] }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { id, jobTitle, categoryId, companyName, companyIndustry, jobUrl, location, workModel, companySize, skills } = jobApplication;

  return (
    <Card className="group relative w-full overflow-hidden rounded-md">
      <div className="absolute left-0 h-full w-1 opacity-20 transition-colors group-hover:opacity-100" style={{ backgroundColor: color }} />
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <CardTitle className="line-clamp-2 text-lg font-semibold transition-colors">{jobTitle}</CardTitle>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button className="absolute right-2 top-2" variant="ghost" size="icon">
                    <MoreVertical className="!size-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <EditJobApplicationDialog jobApplication={jobApplication} categories={categories} onDialogClose={() => setDropdownOpen(false)} />
                  <DeleteJobApplicationButton id={id} jobTitle={jobTitle} category={categories.find((c) => c.id === categoryId)!.name} onDialogClose={() => setDropdownOpen(false)} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="flex items-center">
              <Building2 className="h-4 w-4" />
              <span className="ml-1.5 font-medium text-foreground/90">{companyName}</span>

              {companyIndustry && (
                <Badge variant="secondary" className="px ml-3 px-1.5 py-0 font-normal">
                  {companyIndustry}
                </Badge>
              )}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <a href={jobUrl} target="_blank" rel="noopener noreferrer" className="ml-3 block">
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-70" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>View job posting</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-2">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </div>
          )}
          {workModel && (
            <div className="flex items-center gap-1">
              <Globe2 className="h-3.5 w-3.5" />
              <span>{workModel}</span>
            </div>
          )}
          {companySize && (
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{companySize} employees</span>
            </div>
          )}
        </div>

        {skills && skills.length > 0 && skills[0] !== '' && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
