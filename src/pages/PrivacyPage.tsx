import { Shield, Cookie, Eye, Lock, Database, AlertTriangle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">سياسة الخصوصية</h1>
        <p className="text-gray-600">آخر تحديث: يناير 2025</p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">مقدمة</h2>
          <p className="text-gray-700 leading-relaxed">
            نحرص في مدونة المعرفة على حماية خصوصية زوارنا. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدامك لموقعنا.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-800">المعلومات التي نجمعها</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>معلومات التصفح: مثل نوع المتصفح، نظام التشغيل، وعنوان IP (لأغراض إحصائية فقط)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>معلومات الاتصال: عند ملء نموذج الاتصال (الاسم والبريد الإلكتروني)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>ملفات تعريف الارتباط (Cookies): لتحسين تجربة التصفح</span>
            </li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-800">ملفات تعريف الارتباط</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع. تشمل:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• ملفات ضرورية لعمل الموقع</li>
            <li>• ملفات تحليلية لفهم كيفية استخدام الموقع</li>
            <li>• ملفات إعلانية (عند تفعيل الإعلانات)</li>
          </ul>
          <p className="text-gray-700 mt-4">
            يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال إعدادات متصفحك.
          </p>
        </section>

        {/* Advertising */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-800">الإعلانات</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            قد يعرض الموقع إعلانات من شبكات إعلانية طرف ثالث. هذه الشبكات قد تستخدم ملفات تعريف الارتباط لجمع معلومات عن زياراتك للمواقع (بما في ذلك موقعنا) لتقديم إعلانات مخصصة. يمكنك مراجعة سياسات هذه الشبكات لمعرفة كيفية حماية بياناتك.
          </p>
        </section>

        {/* Data Protection */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-800">حماية البيانات</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الحذف. ومع ذلك، لا يمكن ضمان أمان أي نقل عبر الإنترنت بنسبة 100%.
          </p>
        </section>

        {/* Third Party */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">روابط خارجية</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            قد يحتوي الموقع على روابط لمواقع خارجية. لسنا مسؤولين عن ممارسات الخصوصية لهذه المواقع، وننصح بقراءة سياسات الخصوصية الخاصة بها.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
          <p className="text-gray-700 leading-relaxed">
            إذا كان لديك أي استفسار حول سياسة الخصوصية، يمكنك التواصل معنا عبر صفحة{' '}
            <a href="/contact" className="text-primary hover:underline font-medium">اتصل بنا</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
