interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-1 sm:py-3 sm:px-2 font-medium text-xs sm:text-sm text-center border-b-2 transition-colors rounded-t-md ${
        isActive 
          ? 'border-blue-500 text-blue-600 bg-blue-50' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
      style={{ transition: 'all 0.3s ease' }}
    >
      {children}
    </button>
  );
}
