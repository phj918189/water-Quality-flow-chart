import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen w-full bg-gray-50 py-8 ${className}`}>
      <div className="mx-auto max-w-4xl px-4">
        {children}
      </div>
    </div>
  );
}
