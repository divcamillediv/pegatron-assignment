import { createContext, useState } from 'react';

interface PaginationHandler {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

export const PaginationContext = createContext<PaginationHandler>(undefined as any);

export const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, totalPages, setTotalPages }}>
      {children}
    </PaginationContext.Provider>
  );
};

