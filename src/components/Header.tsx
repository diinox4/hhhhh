import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, BookOpen } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold">مدونة المعرفة</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">الرئيسية</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">من نحن</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">اتصل بنا</Link>
            <Link to="/privacy" className="text-gray-700 hover:text-primary transition-colors font-medium">سياسة الخصوصية</Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors font-medium">لوحة التحكم</Link>
          </nav>

          {/* Search Form - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 px-4 py-2 pr-10 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="mt-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث في المقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
            <nav className="flex flex-col gap-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium py-2">الرئيسية</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium py-2">من نحن</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium py-2">اتصل بنا</Link>
              <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium py-2">سياسة الخصوصية</Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium py-2">لوحة التحكم</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
