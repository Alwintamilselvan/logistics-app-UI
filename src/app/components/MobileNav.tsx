import { ArrowLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router';

interface MobileNavProps {
  title: string;
  showBack?: boolean;
}

export function MobileNav({ title, showBack = false }: MobileNavProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#2563eb] text-white px-5 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-md">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
      ) : (
        <Package className="w-6 h-6" />
      )}
      <h1 className="text-white flex-1 truncate">{title}</h1>
    </div>
  );
}