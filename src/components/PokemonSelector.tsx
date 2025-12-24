import { useState } from 'react';
import { Pokemon } from '../types/pokemon';

function PokemonSelector() {
    // ระบุ Type ให้ useState
    // กรณีที่ค่าอาจเป็น null หรือ undefined
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    // กรณีเป็น Array
    const [favorites, setFavorites] = useState<Pokemon[]>([]);

    // กรณีเป็น Object
    const [filters, setFilters] = useState<{
        type: string;
        search: string;
        page: number;
    }>({
        type: 'all',
        search: '',
        page: 1
    });

    // อัพเดท Object State (ต้อง spread ค่าเดิมด้วย)
    const updateSearch = (searchText: string) => {
        setFilters(prev => ({
            ...prev,           // เก็บค่าเดิม
            search: searchText // อัพเดทเฉพาะ search
        }));
    };

    // เพิ่ม Pokemon เข้า favorites
    const addToFavorites = (pokemon: Pokemon) => {
        setFavorites(prev => [...prev, pokemon]);
    };

    // ลบ Pokemon ออกจาก favorites
    const removeFromFavorites = (pokemonId: number) => {
        setFavorites(prev => prev.filter(p => p.id !== pokemonId));
    };

    return (
        <div>
            <input
                type="text"
                value={filters.search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="ค้นหา Pokemon..."
            />

            {selectedPokemon && (
                <div>
                    <h3>Selected: {selectedPokemon.name}</h3>
                </div>
            )}

            <p>Favorites: {favorites.length}</p>
        </div>
    );
}

export default PokemonSelector;