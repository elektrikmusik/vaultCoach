import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <div className="flex gap-2">
      {languages.map(lang => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}
