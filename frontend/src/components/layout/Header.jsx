import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈' },
  { to: '/dashboard', label: '대시보드' },
  { to: '/community', label: '커뮤니티' },
  { to: '/mypage', label: '마이페이지' },
];

function Header() {
  return (
    <header className="app-header">
      <NavLink to="/" className="brand">
        <span className="brand-mark">S</span>
        <span>Sentivest</span>
      </NavLink>
      <nav className="nav-links" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
