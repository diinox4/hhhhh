import { BookOpen, Target, Users, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">من نحن</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          مدونة المعرفة هي منصة عربية تهدف لنشر المحتوى المفيد والمعرفة الموثوقة
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">رسالتنا</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          نسعى لتقديم محتوى عربي عالي الجودة يساعد القارئ العربي على تطوير مهاراته ومعارفه في مختلف المجالات. نؤمن بأن المعرفة حق للجميع، ونعمل على جعلها سهلة الوصول ومفهومة.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">محتوى موثوق</h3>
          <p className="text-gray-600 text-sm">نحرص على التحقق من المعلومات وذكر المصادر في كل مقال ننشره.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">للقارئ العربي</h3>
          <p className="text-gray-600 text-sm">محتوى مصمم خصيصاً للقارئ العربي بأسلوب واضح وسلس.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">تنوع المواضيع</h3>
          <p className="text-gray-600 text-sm">نغطي مجالات متعددة: التقنية، الصحة، التعليم، تطوير الذات، والمزيد.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">تحديث مستمر</h3>
          <p className="text-gray-600 text-sm">نضيف مقالات جديدة بشكل دوري ونحدث المحتوى القديم باستمرار.</p>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">فريق العمل</h2>
        <p className="text-gray-700 leading-relaxed">
          فريقنا مكون من كتّاب ومحررين ومتخصصين في مجالات مختلفة، يعملون بشغف لتقديم أفضل محتوى عربي. نرحب دائماً بالكتّاب والمساهمين الجدد الذين يشاركوننا نفس الرؤية.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          إذا كنت ترغب في المساهمة بكتابة مقال أو مشاركة فكرة، لا تتردد في <a href="/contact" className="text-primary hover:underline">التواصل معنا</a>.
        </p>
      </div>
    </div>
  );
}
