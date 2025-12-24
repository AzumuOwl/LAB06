import TypeBadge from './TypeBadge';
import type { PokemonCardData } from '../types/pokemon';
import './PokemonCard.css';

interface PokemonCardProps {
    pokemon: PokemonCardData;
    onFavoriteClick?: (id: number) => void;
    isFavorite?: boolean;
    onClick?: () => void; // เพิ่ม callback สำหรับคลิกที่ card
}

function PokemonCard({
                         pokemon,
                         onFavoriteClick,
                         isFavorite = false,
                         onClick
                     }: PokemonCardProps) {
    // Format Pokemon ID: 1 -> #001
    const formatId = (id: number): string => `#${id.toString().padStart(3, '0')}`;

    // Capitalize first letter
    const formatName = (name: string): string =>
        name.charAt(0).toUpperCase() + name.slice(1);

    // จัดการคลิก Favorite
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // ป้องกัน trigger onClick ของ card
        if (onFavoriteClick) {
            onFavoriteClick(pokemon.id);
        }
    };

    return (
        <div className="pokemon-card" onClick={onClick}>
            {/* Favorite Button */}
            <button
                className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            {/* Pokemon Image */}
            <div className="pokemon-image">
                <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    loading="lazy"
                />
            </div>

            {/* Pokemon Info */}
            <div className="pokemon-info">
                <span className="pokemon-id">{formatId(pokemon.id)}</span>
                <h3 className="pokemon-name">{formatName(pokemon.name)}</h3>

                {/* Types */}
                <div className="pokemon-types">
                    {pokemon.types.map((type) => (
                        <TypeBadge key={type} typeName={type} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
