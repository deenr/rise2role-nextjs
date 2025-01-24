import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

interface SkillsInputProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillsInput({ skills, onSkillsChange }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !skills.includes(trimmedValue)) {
      onSkillsChange([...skills, trimmedValue]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addSkill}
        placeholder={skills.length === 0 ? 'Type a skill and press Enter' : ''}
        className="pr-2"
      />
      <div className="pointer-events-none absolute left-2 top-1/2 flex max-w-[calc(100%-2rem)] flex-wrap gap-1">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="pointer-events-auto flex items-center gap-1">
            {skill}
            <button type="button" onClick={() => removeSkill(skill)} className="rounded-full p-0.5 hover:bg-muted">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
