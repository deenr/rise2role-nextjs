import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

interface ChipsInputProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export function ChipsInput({ values, onValuesChange }: ChipsInputProps) {
  const INPUT_PADDING_LEFT_IN_PX = 12;
  const INPUT_GAP_IN_PX = 4;

  const [inputValue, setInputValue] = useState('');
  const [inputPaddingLeft, setInputPaddingLeft] = useState(INPUT_PADDING_LEFT_IN_PX);

  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !values.includes(trimmedValue)) {
      onValuesChange([...values, trimmedValue]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onValuesChange(values.filter((skill) => skill !== skillToRemove));
  };

  useEffect(() => {
    setInputPaddingLeft(INPUT_PADDING_LEFT_IN_PX + (ref.current?.offsetWidth ?? 0) + (values.length > 0 ? INPUT_GAP_IN_PX : 0));
  }, [values, ref.current]);

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addSkill}
        placeholder="Type a skill and press Enter"
        style={{ paddingLeft: `${inputPaddingLeft}px` }}
      />
      <div ref={ref} className="pointer-events-none absolute left-2 top-1/2 flex max-w-[calc(100%-2rem)] -translate-y-1/2 flex-wrap gap-1">
        {values.map((skill) => (
          <Badge key={skill} variant="outline" className="pointer-events-auto flex items-center gap-1 bg-background pr-1.5">
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
