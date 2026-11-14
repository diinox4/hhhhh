import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-white">مدونة المعرفة</span>
            </div>
            <p className="text-sm leading-relaxed">
              مدونة عربية تهدف لنشر المعرفة والمحتوى المفيد في مجالات التقنية والصحة والتعليم وتطوير الذات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">التصنيفات</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/تقنية" className="hover:text-primary transition-colors">تقنية</Link></li>
              <li><Link to="/category/صحة" className="hover:text-primary transition-colors">صحة</Link></li>
              <li><Link to="/category/تعليم" className="hover:text-primary transition-colors">تعليم</Link></li>
              <li><Link to="/category/تطوير ذات" className="hover:text-primary transition-colors">تطوير ذات</Link></li>
              <li><Link to="/category/علوم" className="hover:text-primary transition-colors">علوم</Link></li>
              <li><Link to="/category/ريادة أعمال" className="hover:text-primary transition-colors">ريادة أعمال</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            صُنع بـ <Heart className="w-4 h-4 text-red-500 fill-red-500" /> لنشر المعرفة العربية
          </p>
          <p className="mt-2 text-gray-500">© {new Date().getFullYear()} مدونة المعرفة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
