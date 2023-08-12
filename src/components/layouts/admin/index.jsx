import Sidebar from "./Sidebar";

const AdminLayOut = ({ children }) => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-2 w-full row-start-1 bg-gray-500">
        <Sidebar />
      </div>
      <main className="w-full col-start-3 p-6 col-span-10 row-start-1 bg-black h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayOut;
