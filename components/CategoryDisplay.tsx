// CategoryDisplay.tsx
'use client';

import { useState } from 'react';
import Carousel_ImgTop from '@/components/Carousel/CarouselImgTop';

interface Resource {
    id: string;
    title: string;
    description: string;
    link: string;
    imagelink: string;
    typeId: string;
}

interface Category {
    id: string;
    title: string;
    resources: Resource[];
}

interface CategoryDisplayProps {
    categories: Category[];
    sectionColor: string;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ categories, sectionColor }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
    };

    const handleViewAll = () => {
        setSelectedCategoryId(null);
    };

    const filteredCategories = selectedCategoryId
        ? categories.filter((cat) => cat.id === selectedCategoryId)
        : categories;

    return (
        <div>
            {/* Affichage des titres de catégories en ligne */}
            <div className="flex flex-wrap gap-4 mb-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`px-4 py-2 rounded ${selectedCategoryId === cat.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => handleCategoryClick(cat.id)}
                    >
                        {cat.title}
                    </button>
                ))}
                {/* Bouton "Tout voir" */}
                <button
                    className={`px-4 py-2 rounded ${selectedCategoryId === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    onClick={handleViewAll}
                >
                    Tout voir
                </button>
            </div>
            {/* Affichage des catégories filtrées */}
            {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) =>
                    cat.resources.length > 0 ? (
                        <div key={cat.id} className="mt-12">
                            <h2 className="text-2xl font-bold mb-4">{cat.title}</h2>
                            <Carousel_ImgTop resources={cat.resources} color={sectionColor} />
                        </div>
                    ) : null
                )
            ) : (
                <p className="text-center mt-12">Aucune catégorie trouvée pour cette blockchain.</p>
            )}
        </div>
    );
};

export default CategoryDisplay;
