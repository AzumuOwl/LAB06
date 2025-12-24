import { useRef, useEffect } from 'react';

// Custom hook สำหรับเก็บค่าก่อนหน้า
function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

// ตัวอย่างการใช้งาน
function PokemonTracker({ pokemonId }: { pokemonId: number }) {
    const previousId = usePrevious(pokemonId);

    useEffect(() => {
        if (previousId !== undefined && previousId !== pokemonId) {
            console.log(`Changed from ${previousId} to ${pokemonId}`);
        }
    }, [pokemonId, previousId]);

    return (
        <div>
            <p>Current: #{pokemonId}</p>
    <p>Previous: #{previousId ?? 'none'}</p>
    </div>
);
}

export { usePrevious };