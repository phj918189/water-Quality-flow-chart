import TabButton from './TabButton';

interface TabItem {
  id: string;
  label: string;
  mobileLabel: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <nav className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              mobileLabel={tab.mobileLabel}
              children={tab.label}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
