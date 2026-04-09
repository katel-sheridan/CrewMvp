import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (opt: string) => {
    // Clicking the active option deselects it (back to 'Any')
    if (value === opt) {
      onChange('Any');
    } else {
      onChange(opt);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`bg-[#212226] flex gap-[8px] h-[36px] items-center min-w-[120px] pl-[16px] pr-[12px] py-[12px] rounded-[8px] border cursor-pointer w-full sm:w-[227px] ${
          value !== 'Any' ? 'border-[#a5ff5f]' : 'border-[#323339]'
        }`}
      >
        <span className={`flex-1 font-['Satoshi',sans-serif] font-[400] leading-[1.4] text-[14px] text-left truncate ${
          value !== 'Any' ? 'text-[#a5ff5f]' : 'text-[rgba(255,255,255,0.6)]'
        }`}>
          {value === 'Any' ? label : value}
        </span>
        <ChevronDown size={16} className={value !== 'Any' ? 'text-[#a5ff5f] shrink-0' : 'text-[rgba(255,255,255,0.6)] shrink-0'} />
      </button>
      {open && (
        <div className="absolute top-[40px] left-0 bg-[#212226] border border-[#323339] rounded-[8px] z-50 min-w-full shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left px-[16px] py-[10px] font-['Satoshi',sans-serif] text-[14px] cursor-pointer transition-colors ${
                value === opt
                  ? 'text-[#a5ff5f] bg-[#2a2a2e]'
                  : 'text-[rgba(255,255,255,0.87)] hover:bg-[#2a2a2e]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface FilterBarProps {
  paymentType: string;
  duration: string;
  availability: string;
  onPaymentChange: (v: string) => void;
  onDurationChange: (v: string) => void;
  onAvailabilityChange: (v: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  showAvailability?: boolean;
}

const paymentOptions = ['Any', 'Paid', 'Hobby'];
const durationOptions = ['Any', 'Short-term', 'Long-term', 'One-time'];
const availabilityOptions = ['Any', 'Open', 'Closed'];
const sortOptions = ['Best Match', 'Newest', 'Oldest'];

export function FilterBar({
  paymentType, duration, availability,
  onPaymentChange, onDurationChange, onAvailabilityChange,
  sortBy, onSortChange, showAvailability = true,
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex items-center justify-between w-full flex-wrap gap-[12px]">
      <div className="flex gap-[16px] items-center flex-wrap">
        <Dropdown label="Payment Type" options={paymentOptions} value={paymentType} onChange={onPaymentChange} />
        <Dropdown label="Duration of Collab" options={durationOptions} value={duration} onChange={onDurationChange} />
        {showAvailability && (
          <Dropdown label="Availability" options={availabilityOptions} value={availability} onChange={onAvailabilityChange} />
        )}
      </div>
      <div className="relative flex gap-[4px] items-center justify-end text-[rgba(255,255,255,0.87)] cursor-pointer pl-[8px] pr-[6px]" ref={sortRef} onClick={() => setSortOpen(!sortOpen)}>
        <span className="font-['Satoshi',sans-serif] font-[400] text-[14px] leading-[1.4]">Sort by:</span>
        <span className="font-['Satoshi',sans-serif] font-[500] text-[14px] leading-[1.4]">{sortBy}</span>
        <ChevronDown size={14} className="text-[rgba(255,255,255,0.87)]" />
        {sortOpen && (
          <div className="absolute top-[28px] right-0 bg-[#212226] border border-[#323339] rounded-[8px] z-50 min-w-[140px] shadow-lg overflow-hidden">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => { onSortChange(opt); setSortOpen(false); }}
                className={`w-full text-left px-[16px] py-[10px] font-['Satoshi',sans-serif] text-[14px] cursor-pointer transition-colors ${
                  sortBy === opt
                    ? 'text-[#a5ff5f] bg-[#2a2a2e]'
                    : 'text-[rgba(255,255,255,0.87)] hover:bg-[#2a2a2e]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}