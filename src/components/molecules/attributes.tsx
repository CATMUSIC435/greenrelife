// components/Attributes.tsx
'use client';

export default function Attributes({
  attributes,
  selectedOptions,
  onChange,
}: {
  attributes: any[];
  selectedOptions: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  if (!attributes || attributes.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {attributes.map((attr: any) => (
        <div key={attr.id ?? attr.name} className="mb-3">
          <p className="mb-2 font-medium">{attr.name}</p>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((opt: string) => {
              const active = selectedOptions[attr.name] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange(attr.name, opt)}
                  className={`rounded border px-3 py-1 ${active ? 'bg-black text-white' : 'bg-white'}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
