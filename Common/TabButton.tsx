interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-2 sm:py-4 sm:px-4 font-medium text-xs sm:text-sm whitespace-nowrap border-b-2 transition-colors ${
        isActive 
          ? 'border-blue-500 text-blue-600 bg-blue-50' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
      style={{ transition: 'all 0.3s ease' }}
    >
      {children}
    </button>
  );
}
