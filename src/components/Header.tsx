import './Header.css';  // Import CSS file

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <span className="logo-icon">🎮</span>
                    <h1>Pokemon App</h1>
                </div>
                <nav className="nav">
                    <a href="Header.tsx#home">Home</a>
                    <a href="Header.tsx#favorites">Favorites</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;