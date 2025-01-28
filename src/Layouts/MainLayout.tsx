import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col bg-[#F6F6F4] min-h-screen">
      <Header />
      <div className="flex flex-1 mx-[236px] mt-[112px] mb-[230px]">
        <Sidebar />
        <div className="flex-1 mx-8 bg-white p-4 rounded-xl border border-gray-200">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
