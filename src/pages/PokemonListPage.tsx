import { useState, useCallback } from 'react';
import usePokemonList from '../hooks/usePokemonList';
import useLocalStorage from '../hooks/useLocalStorage';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import './PokemonListPage.css';

function PokemonListPage() {
    const { pokemonList, loading, error, hasMore, loadMore, refresh } = usePokemonList();
    const [favorites, setFavorites] = useLocalStorage<number[]>('pokemon-favorites', []);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const toggleFavorite = useCallback((id: number) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id]
        );
    }, [setFavorites]);

    const isFavorite = useCallback((id: number) => {
        return favorites.includes(id);
    }, [favorites]);

    if (error) {
        return (
            <div className="error-container">
                <h2>😢 เกิดข้อผิดพลาด</h2>
                <p>{error}</p>
                <button onClick={refresh}>ลองใหม่</button>
            </div>
        );
    }

    return (
        <div className="pokemon-list-page">
            <header className="page-header">
                <h1>🎮 Pokemon Collection</h1>
                <div className="header-stats">
                    <span>📊 รวม: {pokemonList.length} ตัว</span>
                    <span>❤️ ชอบ: {favorites.length} ตัว</span>
                </div>
                <button className="refresh-btn" onClick={refresh}>
                    🔄 รีเฟรช
                </button>
            </header>

            <div className="pokemon-grid">
                {pokemonList.map(pokemon => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        isFavorite={isFavorite(pokemon.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => setSelectedId(pokemon.id)}
                    />
                ))}
            </div>

            {loading && <Loading message="กำลังโหลด Pokemon..." />}

            {!loading && hasMore && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={loadMore}>
                        โหลดเพิ่มเติม
                    </button>
                </div>
            )}

            {!loading && !hasMore && pokemonList.length > 0 && (
                <p className="end-message">
                    🎉 แสดง Pokemon ทั้งหมดแล้ว!
                </p>
            )}
        </div>
    );
}

export default PokemonListPage;