import { Bug } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Spacer for fixed navigation */}
      <div style={{ height: '72px' }} />
      
      {/* Centered content taking up all available space */}
      <div className="flex-1 flex items-center justify-center px-6" style={{ minHeight: 'calc(100vh - 72px - 120px)' }}>
        <div className="flex flex-col items-center justify-center text-neutral-400">
          <Bug size={48} className="mb-4" />
          <p className="text-[16px] font-bold">Squashing some bugs — be right back!</p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-6 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] text-neutral-500">© 2026 Amir Einy</p>
        </div>
      </footer>
    </div>
  );
}