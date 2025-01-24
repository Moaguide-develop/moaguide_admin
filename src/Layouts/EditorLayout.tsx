import Header from "../components/Header";
import EditorSidebar from "../components/EditorSidebar";
import Footer from "../components/Footer";

const EditorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <EditorSidebar />
        <div className="flex-1 bg-gray-50">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default EditorLayout;
