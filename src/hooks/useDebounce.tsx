import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // ตั้ง timer เพื่อ delay การอัพเดท
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: ยกเลิก timer ถ้า value เปลี่ยนก่อน delay หมด
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;

// ตัวอย่างการใช้งาน
function PokemonSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    // รอ 500ms หลังจากพิมพ์เสร็จค่อย search
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearch) {
            // Fetch Pokemon ที่นี่
            console.log('Searching for:', debouncedSearch);
        }
    }, [debouncedSearch]);

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหา Pokemon..."
        />
    );
}