import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ExternalLink, Share2, ArrowRight, Copy, Check } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import type { Article } from '../data/articles';
import { sampleArticles } from '../data/articles';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('blog_articles');
    const articles: Article[] = saved ? JSON.parse(saved) : sampleArticles;
    const found = articles.find(a => a.id === id);
    setArticle(found || null);

    if (found) {
      const related = articles
        .filter(a => a.category === found.category && a.id !== found.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [id]);

  const handleShare = (platform: string) => {
    if (!article) return;
    const url = window.location.href;
    const text = article.title;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">المقال غير موجود</h1>
        <Link to="/" className="text-primary hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{trimmed.slice(3)}</h2>;
      if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-gray-700 mt-6 mb-3">{trimmed.slice(4)}</h3>;
      if (trimmed.startsWith('> ')) return <blockquote key={i} className="border-r-4 border-primary bg-blue-50 p-4 my-4 text-gray-700 italic rounded-l-lg">{trimmed.slice(2)}</blockquote>;
      if (trimmed.startsWith('- ')) {
        const text = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <li key={i} className="mr-6 mb-2 text-gray-700" dangerouslySetInnerHTML={{ __html: text }} />;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <li key={i} className="mr-6 mb-2 text-gray-700 list-decimal" dangerouslySetInnerHTML={{ __html: text }} />;
      }
      const text = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: text }} />;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Ad Space - Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <AdPlaceholder position="top" />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <span>/</span>
          <Link to={`/category/${article.category}`} className="hover:text-primary">{article.category}</Link>
          <span>/</span>
          <span className="text-gray-700 truncate">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-xl">
          <span className="text-sm font-medium text-gray-600">شارك المقال:</span>
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              مشاركة
            </button>
            {showShareMenu && (
              <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[150px]">
                <button onClick={() => handleShare('whatsapp')} className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded">واتساب</button>
                <button onClick={() => handleShare('twitter')} className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded">تويتر</button>
                <button onClick={() => handleShare('facebook')} className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded">فيسبوك</button>
                <button onClick={() => handleShare('telegram')} className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded">تيليجرام</button>
                <button onClick={() => handleShare('copy')} className="w-full text-right px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-1">
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  نسخ الرابط
                </button>
              </div>
            )}
          </div>
          {article.tags.length > 0 && (
            <div className="flex items-center gap-2 mr-auto flex-wrap">
              <Tag className="w-3 h-3 text-gray-400" />
              {article.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          {renderContent(article.content)}
        </div>

        {/* Sources */}
        {article.sources.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              المصادر والمراجع
            </h3>
            <ul className="space-y-2">
              {article.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 text-sm"
                  >
                    {source.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ad Space - Inline */}
        <AdPlaceholder position="inline" className="mb-8" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">مقالات ذات صلة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map(related => (
                <Link
                  key={related.id}
                  to={`/article/${related.id}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img src={related.coverImage} alt={related.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 line-clamp-2">{related.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{related.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </article>

      {/* Ad Space - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
}
