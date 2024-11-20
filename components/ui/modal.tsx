'use client';
import { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {title && (
                        <div className="mb-4 pb-4 border-b">
                            <h2 className="text-2xl font-bold font-poppins text-center">{title}</h2>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
} 