import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1>Satellite Operations Service Optimizer</h1>
      <Link href="/login" style={loginButtonStyle}>
         Log In
      </Link>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
};

const loginButtonStyle = {
  padding: '10px 20px',
  background: 'blue',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
};

export default Header;