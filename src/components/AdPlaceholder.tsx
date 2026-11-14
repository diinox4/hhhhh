interface AdPlaceholderProps {
  position: 'top' | 'sidebar' | 'inline' | 'bottom';
  className?: string;
}

/**
 * مكون لعرض مساحة إعلانية تجريبية.
 * 
 * عند ربط شبكة إعلانية حقيقية (مثل Google AdSense):
 * 1. استبدل محتوى هذا المكون بكود الإعلان الفعلي
 * 2. أضف معرّف الإعلان من حسابك
 * 3. يمكنك استخدام position لتحديد مكان الإعلان
 * 
 * مثال لـ Google AdSense:
 * <ins className="adsbygoogle"
 *   style={{ display: 'block' }}
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"
 *   data-ad-format="auto"
 *   data-full-width-responsive="true"
 * />
 */
export default function AdPlaceholder({ position, className = '' }: AdPlaceholderProps) {
  const sizeClasses = {
    top: 'h-24 sm:h-28',
    sidebar: 'h-64',
    inline: 'h-32 sm:h-36',
    bottom: 'h-24 sm:h-28',
  };

  return (
    <div
      className={`w-full ${sizeClasses[position]} bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      aria-label="مساحة إعلانية"
    >
      <div className="text-center">
        <p className="text-gray-400 text-sm font-medium">مساحة إعلانية</p>
        <p className="text-gray-300 text-xs mt-1">
          {position === 'sidebar' ? '300×250' : position === 'top' || position === 'bottom' ? '728×90' : '468×60'}
        </p>
        {/* 
          TODO: عند تفعيل الإعلانات، استبدل هذا المحتوى بكود الشبكة الإعلانية
          مكان إضافة كود الإعلانات: src/components/AdPlaceholder.tsx
          أو يمكنك إنشاء مكون AdSense منفصل واستيراده هنا
        */}
      </div>
    </div>
  );
}
