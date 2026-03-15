interface MobileViewportProps {
  children: React.ReactNode;
}

export function MobileViewport({ children }: MobileViewportProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-[430px] min-h-screen md:min-h-[844px] md:max-h-[900px] bg-white md:shadow-2xl md:rounded-[2.5rem] md:border-8 md:border-gray-800 relative overflow-hidden overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}