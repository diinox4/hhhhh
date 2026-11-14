import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image, Link as LinkIcon, Tag, FileText } from 'lucide-react';
import type { Article } from '../data/articles';
import { sampleArticles, categories } from '../data/articles';

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: '',
    category: categories[0],
    tags: '',
    sources: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('blog_articles');
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      setArticles(sampleArticles);
      localStorage.setItem('blog_articles', JSON.stringify(sampleArticles));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('blog_articles', JSON.stringify(newArticles));
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', coverImage: '', author: '', category: categories[0], tags: '', sources: '' });
    setEditingArticle(null);
    setIsCreating(false);
    setShowForm(false);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage,
      author: article.author,
      category: article.category,
      tags: article.tags.join(', '),
      sources: article.sources.map(s => `${s.title}|${s.url}`).join('\n'),
    });
    setIsCreating(false);
    setShowForm(true);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('يرجى ملء العنوان والمحتوى على الأقل');
      return;
    }

    const sources = formData.sources
      .split('\n')
      .filter(s => s.trim())
      .map(s => {
        const parts = s.split('|');
        return { title: parts[0]?.trim() || '', url: parts[1]?.trim() || '' };
      });

    if (isCreating) {
      const newArticle: Article = {
        id: Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt || formData.content.slice(0, 150),
        content: formData.content,
        coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
        author: formData.author || 'محرر المدونة',
        date: new Date().toISOString().split('T')[0],
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        sources,
      };
      const updated = [newArticle, ...articles];
      saveArticles(updated);
    } else if (editingArticle) {
      const updated = articles.map(a =>
        a.id === editingArticle.id
          ? {
              ...a,
              title: formData.title,
              excerpt: formData.excerpt || formData.content.slice(0, 150),
              content: formData.content,
              coverImage: formData.coverImage || a.coverImage,
              author: formData.author || a.author,
              category: formData.category,
              tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
              sources,
            }
          : a
      );
      saveArticles(updated);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      const updated = articles.filter(a => a.id !== id);
      saveArticles(updated);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-1">إدارة المقالات ({articles.length} مقال)</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          مقال جديد
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {isCreating ? 'إنشاء مقال جديد' : 'تعديل المقال'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4 inline ml-1" />
                  العنوان *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="عنوان المقال"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف المختصر</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="وصف قصير يظهر في قائمة المقالات"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Image className="w-4 h-4 inline ml-1" />
                  رابط صورة الغلاف
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">يمكنك استخدام صور من Unsplash أو أي مصدر مرخّص</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الكاتب</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="اسم الكاتب"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Tag className="w-4 h-4 inline ml-1" />
                  الوسوم (مفصولة بفاصلة)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="تقنية, برمجة, تعلم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <LinkIcon className="w-4 h-4 inline ml-1" />
                  المصادر (سطر لكل مصدر: العنوان|الرابط)
                </label>
                <textarea
                  value={formData.sources}
                  onChange={(e) => setFormData({ ...formData, sources: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={"ويكيبيديا|https://ar.wikipedia.org\nمصدر آخر|https://example.com"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4 inline ml-1" />
                  المحتوى * (يدعم Markdown بسيط)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                  placeholder={"## عنوان فرعي\n\nمحتوى المقال هنا...\n\n### عنوان ثالث\n\n- نقطة 1\n- نقطة 2\n\n> اقتباس"}
                />
                <p className="text-xs text-gray-500 mt-1">
                  يمكنك استخدام: ## للعناوين، - للقوائم، &gt; للاقتباسات، **للخط العريض**
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={handleSave}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                حفظ المقال
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">المقال</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600 hidden sm:table-cell">التصنيف</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">التاريخ</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={article.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate max-w-[200px] sm:max-w-[300px]">{article.title}</p>
                        <p className="text-xs text-gray-500">{article.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{article.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                    {new Date(article.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">لا توجد مقالات بعد</p>
            <button onClick={handleCreate} className="text-primary hover:underline mt-2 text-sm">
              أنشئ أول مقال
            </button>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-amber-800 mb-2">💡 ملاحظات مهمة</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• المقالات تُحفظ في المتصفح (localStorage) — لن تظهر على أجهزة أخرى</li>
          <li>• لاستخدام قاعدة بيانات حقيقية، يمكنك ربط الموقع بخادم (Backend) لاحقاً</li>
          <li>• يمكنك استخدام روابط صور من Unsplash.com (مجانية ومرخّصة)</li>
          <li>• تأكد من حقوق الصور والمحتوى قبل النشر</li>
        </ul>
      </div>
    </div>
  );
}
