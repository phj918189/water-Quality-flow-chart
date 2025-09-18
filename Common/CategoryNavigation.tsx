import CategoryTab from './CategoryTab';

interface CategoryItem {
  id: string;
  label: string;
}

interface CategoryNavigationProps {
  categories: CategoryItem[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNavigation({ categories, activeCategory, onCategoryChange }: CategoryNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex space-x-1">
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              isActive={activeCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </CategoryTab>
          ))}
        </nav>
      </div>
    </div>
  );
}
