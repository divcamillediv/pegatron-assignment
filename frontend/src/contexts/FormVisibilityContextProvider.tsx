import React, { createContext, useState, ReactNode } from 'react';

interface FormVisibilityHandler {
    isFormVisible: boolean;
    toggleFormVisibility: () => void;
}

export const FormVisibilityContext = createContext<FormVisibilityHandler>(undefined as any);

const FormVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setFormVisible(prev => !prev);
    };

    return (
        <FormVisibilityContext.Provider value={{ isFormVisible, toggleFormVisibility }}>
            {children}
        </FormVisibilityContext.Provider>
    );
};

export default FormVisibilityProvider;
