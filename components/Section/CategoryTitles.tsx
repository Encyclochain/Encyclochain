// CategoryTitles.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Select, { components } from 'react-select';

interface Category {
    id: number;
    title: string;
}

interface CategoryTitlesProps {
    categories: Category[];
}

const CategoryTitles: React.FC<CategoryTitlesProps> = ({ categories }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCategoriesParam = searchParams.get('categoryIds');
    const initialSelectedCategories = selectedCategoriesParam
        ? selectedCategoriesParam.split(',').map((id) => parseInt(id))
        : [];

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(initialSelectedCategories);

    const options = categories.map((cat) => ({
        value: cat.id,
        label: cat.title,
    }));

    const selectedOptions = options.filter((option) => selectedCategoryIds.includes(option.value));

    const handleChange = (selectedOptions: any) => {
        const ids = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        setSelectedCategoryIds(ids);
    };

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategoryIds.length > 0) {
            params.set('categoryIds', selectedCategoryIds.join(','));
        } else {
            params.delete('categoryIds');
        }
        router.replace(`${pathname}?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIds]);

    // Custom component to add 'Tout voir' option
    const MenuList = (props: any) => {
        const { options, children } = props;
        const allOptionsSelected = selectedCategoryIds.length === options.length;
        const isIndeterminate = selectedCategoryIds.length > 0 && selectedCategoryIds.length < options.length;

        const handleSelectAll = () => {
            if (allOptionsSelected) {
                // Désélectionner tout
                setSelectedCategoryIds([]);
            } else {
                // Sélectionner tout
                setSelectedCategoryIds(options.map((option: any) => option.value));
            }
        };

        return (
            <>
                <div className="flex items-center px-3 py-2 border-b border-gray-200">
                    <input
                        type="checkbox"
                        checked={allOptionsSelected}
                        ref={(input) => {
                            if (input) {
                                input.indeterminate = isIndeterminate;
                            }
                        }}
                        onChange={handleSelectAll}
                    />
                    <label className="ml-2 font-poppins">Tout voir</label>
                </div>
                <components.MenuList {...props}>{children}</components.MenuList>
            </>
        );
    };

    return (
        <div className="my-8 w-[40%]">
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                isMulti
                placeholder="Sélectionnez des catégories..."
                className="w-full font-poppins"
                closeMenuOnSelect={false}
                components={{ MenuList }}
            />
        </div>
    );
};

export default CategoryTitles;
