import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../data/articles';
import { sampleArticles } from '../data/articles';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('blog_articles');
    const allArticles: Article[] = saved ? JSON.parse(saved) : sampleArticles;
    setArticles(allArticles);
  }, []);

  useEffect(() => {
    if (query && articles.length > 0) {
      const q = query.toLowerCase();
      const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, articles]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <SearchIcon className="w-6 h-6 text-primary" />
          نتائج البحث
        </h1>
        {query && (
          <p className="text-gray-600 mt-2">
            نتائج البحث عن: <span className="font-bold text-primary">"{query}"</span>
            {' '}— {results.length} نتيجة
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">لم يتم العثور على نتائج لـ "{query}"</p>
          <p className="text-gray-400 text-sm mt-2">حاول البحث بكلمات مختلفة</p>
        </div>
      ) : (
        <div className="text-center py-16">
          <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">اكتب كلمة للبحث في المقالات</p>
        </div>
      )}
    </div>
  );
}
