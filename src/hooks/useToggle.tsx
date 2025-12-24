import { useState, useCallback } from 'react';

interface UseToggleReturn {
    value: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
}

function useToggle(initialValue: boolean = false): UseToggleReturn {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    return { value, toggle, setTrue, setFalse };
}

export default useToggle;

// ตัวอย่างการใช้งาน
function PokemonCard() {
    const { value: isFavorite, toggle: toggleFavorite } = useToggle(false);
    const { value: isExpanded, toggle: toggleExpanded } = useToggle(false);

    return (
        <div className="pokemon-card">
            <button onClick={toggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </button>
            <button onClick={toggleExpanded}>
                {isExpanded ? 'ซ่อน' : 'ดูเพิ่มเติม'}
            </button>
            {isExpanded && <div>รายละเอียด...</div>}
        </div>
    );
}