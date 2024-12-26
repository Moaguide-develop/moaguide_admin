import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b border-gray-300">
      <button
        className="text-lg font-bold text-purple-600"
        onClick={() => {
          console.log('home');
          navigate('/');
        }}
      >
        MOA GUIDE
      </button>
      <div className="flex gap-4">
        <button className="text-gray-500 hover:text-gray-700">🔍</button>
        <button className="text-gray-500 hover:text-gray-700">👤</button>
      </div>
    </div>
  );
};

export default Header;
