// hooks/usePagination.ts
import { useCallback, useMemo, useState } from "react";

interface UsePaginationOptions<T> {
    data: T[];
    itemsPerPage?: number;
}

export function usePagination<T>({ data, itemsPerPage = 5 }: UsePaginationOptions<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        return Math.ceil(data.length / itemsPerPage);
    }, [data.length, itemsPerPage]);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = useCallback((page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
    }, [totalPages]);

    const nextPage = useCallback(() => {
        goToPage(currentPage + 1);
    }, [goToPage, currentPage]);

    const prevPage = useCallback(() => {
        goToPage(currentPage - 1);
    }, [goToPage, currentPage]);

    return {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        nextPage,
        prevPage,
    };
}
