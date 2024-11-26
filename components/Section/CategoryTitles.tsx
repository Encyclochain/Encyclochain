'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Select, { components } from 'react-select';

interface Category {
    id: number; // Unique identifier for a category.
    title: string; // The name of the category.
}

interface CategoryTitlesProps {
    categories: Category[]; // Array of category objects to display in the dropdown.
}

const CategoryTitles: React.FC<CategoryTitlesProps> = ({ categories }) => {
    const pathname = usePathname(); // Gets the current route pathname.
    const router = useRouter(); // Used for navigating and updating query parameters.
    const searchParams = useSearchParams(); // Provides access to current URL search parameters.

    // Extract initial selected category IDs from the URL query parameters.
    const selectedCategoriesParam = searchParams.get('categoryIds');
    const initialSelectedCategories = selectedCategoriesParam
        ? selectedCategoriesParam.split(',').map((id) => parseInt(id))
        : [];

    // State to manage selected category IDs.
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(initialSelectedCategories);

    // Maps categories to the format required by `react-select`.
    const options = categories.map((cat) => ({
        value: cat.id,
        label: cat.title,
    }));

    // Filters selected options to match `selectedCategoryIds`.
    const selectedOptions = options.filter((option) => selectedCategoryIds.includes(option.value));

    // Updates selected categories when the dropdown value changes.
    const handleChange = (selectedOptions: any) => {
        const ids = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        setSelectedCategoryIds(ids);
    };

    useEffect(() => {
        // Updates the URL with the selected category IDs.
        const params = new URLSearchParams();
        if (selectedCategoryIds.length > 0) {
            params.set('categoryIds', selectedCategoryIds.join(','));
        } else {
            params.delete('categoryIds');
        }
        router.replace(`${pathname}?${params.toString()}`);
        // Dependency ensures this runs whenever `selectedCategoryIds` changes.
    }, [selectedCategoryIds]);

    // Custom menu component to include a "Select All" option.
    const MenuList = (props: any) => {
        const { options, children } = props;
        const allOptionsSelected = selectedCategoryIds.length === options.length;
        const isIndeterminate = selectedCategoryIds.length > 0 && selectedCategoryIds.length < options.length;

        // Handles toggling "Select All" functionality.
        const handleSelectAll = () => {
            if (allOptionsSelected) {
                setSelectedCategoryIds([]); // Deselect all.
            } else {
                setSelectedCategoryIds(options.map((option: any) => option.value)); // Select all.
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
                                input.indeterminate = isIndeterminate; // Sets the indeterminate state.
                            }
                        }}
                        onChange={handleSelectAll}
                    />
                    <label className="ml-2 font-poppins">Tout voir</label>
                </div>
                {/* Render default menu list items */}
                <components.MenuList {...props}>{children}</components.MenuList>
            </>
        );
    };

    return (
        <div className="my-8 w-[40%]">
            <Select
                options={options} // Available category options.
                value={selectedOptions} // Selected options.
                onChange={handleChange} // Updates state on selection change.
                isMulti // Enables multi-select mode.
                placeholder="Sélectionnez des catégories..." // Placeholder text.
                className="w-full font-poppins" // Styling for the dropdown.
                closeMenuOnSelect={false} // Keeps the menu open after each selection.
                components={{ MenuList }} // Replaces default menu list with custom one.
            />
        </div>
    );
};

export default CategoryTitles;
