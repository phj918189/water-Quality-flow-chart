interface CategoryTabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function CategoryTab({ isActive, onClick, children }: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 font-semibold text-sm text-center border-b-4 transition-colors rounded-t-lg ${
        isActive 
          ? 'border-blue-500 bg-blue-50 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
      style={{ 
        transition: 'all 0.3s ease',
        ...(isActive && {
          backgroundColor: '#dbeafe',
          color: '#2563eb'
        })
      }}
    >
      {children}
    </button>
  );
}
