import { useState, useEffect, useCallback } from 'react';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

interface UsePokemonListReturn {
    pokemonList: Pokemon[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    refresh: () => void;
}

const ITEMS_PER_PAGE = 20;

function usePokemonList(): UsePokemonListReturn {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
        const response = await fetch(url);
        const data = await response.json();

        return {
            id: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            sprite: data.sprites.other['official-artwork'].front_default
                || data.sprites.front_default,
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
            }
        };
    };

    const fetchPokemonList = useCallback(async (currentOffset: number, append: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            // ดึงรายชื่อ Pokemon
            const listResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${currentOffset}`
            );
            const listData: PokemonListResponse = await listResponse.json();

            // ดึงรายละเอียดแต่ละตัว
            const detailPromises = listData.results.map(item =>
                fetchPokemonDetails(item.url)
            );
            const details = await Promise.all(detailPromises);

            // อัพเดท state
            setPokemonList(prev => append ? [...prev, ...details] : details);
            setHasMore(listData.next !== null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
        } finally {
            setLoading(false);
        }
    }, []);

    // โหลดครั้งแรก
    useEffect(() => {
        fetchPokemonList(0);
    }, [fetchPokemonList]);

    const loadMore = useCallback(() => {
        const newOffset = offset + ITEMS_PER_PAGE;
        setOffset(newOffset);
        fetchPokemonList(newOffset, true);
    }, [offset, fetchPokemonList]);

    const refresh = useCallback(() => {
        setOffset(0);
        setPokemonList([]);
        fetchPokemonList(0);
    }, [fetchPokemonList]);

    return {
        pokemonList,
        loading,
        error,
        hasMore,
        loadMore,
        refresh
    };
}

export default usePokemonList;