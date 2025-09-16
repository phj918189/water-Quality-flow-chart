import PrintButton from './PrintButton';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <header className="mb-6 gap-4 text-center">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-center">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600 text-center">{subtitle}</p>}
        {description && <p className="text-sm text-gray-600 text-center">{description}</p>}
      </div>
      <PrintButton />
    </header>
  );
}
