import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import AdPlaceholder from '../components/AdPlaceholder';
import { sampleArticles, categories, type Article } from '../data/articles';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  useEffect(() => {
    // تحميل المقالات من localStorage أو استخدام البيانات التجريبية
    const saved = localStorage.getItem('blog_articles');
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      setArticles(sampleArticles);
      localStorage.setItem('blog_articles', JSON.stringify(sampleArticles));
    }
  }, []);

  const filteredArticles = selectedCategory === 'الكل'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const latestArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredArticle = latestArticles[0];
  const restArticles = latestArticles.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-blue-600 via-blue-700 to-indigo-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            مدونة المعرفة
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            مقالات مفيدة وروابط وموارد متنوعة في التقنية والصحة والتعليم وتطوير الذات
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/20"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space - Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdPlaceholder position="top" />
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-800">المقال المميز</h2>
          </div>
          <ArticleCard article={featuredArticle} featured />
        </section>
      )}

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('الكل')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'الكل'
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-gray-800">أحدث المقالات</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(0, 6).map((article, index) => (
            <div key={article.id}>
              <ArticleCard article={article} />
              {/* Ad after 3rd article */}
              {index === 2 && (
                <div className="mt-6">
                  <AdPlaceholder position="inline" />
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد مقالات في هذا التصنيف حالياً</p>
          </div>
        )}
      </section>

      {/* Ad Space - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <AdPlaceholder position="bottom" />
      </div>

      {/* View All Link */}
      {restArticles.length > 6 && (
        <div className="text-center mt-8">
          <Link
            to="/category/الكل"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            عرض جميع المقالات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
