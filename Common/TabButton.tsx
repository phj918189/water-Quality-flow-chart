interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 font-bold text-lg transition-colors ${
        isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
      }`}
      style={{ transition: 'all 0.3s ease' }}
    >
      {children}
    </button>
  );
}
