import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../data/articles';
import { sampleArticles } from '../data/articles';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('blog_articles');
    const allArticles: Article[] = saved ? JSON.parse(saved) : sampleArticles;
    setArticles(allArticles);
  }, []);

  useEffect(() => {
    if (category && category !== 'الكل') {
      setFiltered(articles.filter(a => a.category === category));
    } else {
      setFiltered(articles);
    }
  }, [category, articles]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FolderOpen className="w-6 h-6 text-primary" />
          {category === 'الكل' ? 'جميع المقالات' : `تصنيف: ${category}`}
        </h1>
        <p className="text-gray-600 mt-2">{filtered.length} مقال</p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">لا توجد مقالات في هذا التصنيف حالياً</p>
        </div>
      )}
    </div>
  );
}
