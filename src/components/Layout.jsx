import { Outlet } from 'react-router-dom';
import Navbar from './NavbarNew';
import Footer from './FooterNew';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

