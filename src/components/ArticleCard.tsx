import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import type { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link to={`/article/${article.id}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-6 text-white">
              <span className="inline-block bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                {article.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString('ar-SA')}
            </span>
          </div>
          {article.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Tag className="w-3 h-3 text-gray-400" />
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
