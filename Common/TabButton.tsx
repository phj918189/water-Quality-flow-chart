interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  mobileLabel: string;
}

export default function TabButton({ isActive, onClick, children, mobileLabel }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-1 sm:py-3 sm:px-2 font-medium text-xs sm:text-sm text-center transition-colors rounded-md ${
        isActive 
          ? 'border-gray-500 bg-gray-600 text-white md:bg-gray-50 md:text-white-600' 
          : 'border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 md:hover:bg-gray-50'
      }`}
      style={{ 
        transition: 'all 0.3s ease',
        ...(isActive && {
          backgroundColor: 'gray',
          color: 'white'
        })
      }}
    >
      <span className="block md:hidden">{mobileLabel}</span>
      <span className="hidden md:block">{children}</span>
    </button>
  );
}
