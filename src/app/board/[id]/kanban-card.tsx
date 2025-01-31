import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Globe2, MapPin, Users } from 'lucide-react';

export function KanbanCard({
  id,
  jobTitle,
  companyName,
  companySize,
  companyIndustry,
  location,
  workModel,
  skills,
  jobUrl,
  color
}: {
  id: string;
  jobTitle: string;
  companyName: string;
  companySize: string | null;
  companyIndustry: string | null;
  location: string | null;
  workModel: string | null;
  skills: string[];
  jobUrl: string;
  color: string;
}) {
  return (
    <Card className="group relative w-full overflow-hidden rounded-md">
      <div className="absolute left-0 h-full w-1 opacity-20 transition-colors group-hover:opacity-100" style={{ backgroundColor: color }} />
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <CardTitle className="line-clamp-2 text-lg font-semibold transition-colors">{jobTitle}</CardTitle>
            </div>
            <CardDescription className="flex items-center">
              <Building2 className="h-4 w-4" />
              <span className="ml-1.5 font-medium text-foreground/90">{companyName}</span>

              {companyIndustry && (
                <Badge variant="secondary" className="px ml-3 px-1.5 py-0 font-normal">
                  {companyIndustry}
                </Badge>
              )}
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
