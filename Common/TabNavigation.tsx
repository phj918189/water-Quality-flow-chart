import TabButton from './TabButton';

interface TabItem {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-3xl mx-auto px-2 sm:px-4">
        <nav className="flex overflow-x-auto scrollbar-hide space-x-1 sm:space-x-4">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </nav>
      </div>
    </div>
  );
}
