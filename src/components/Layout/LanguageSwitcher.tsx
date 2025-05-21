import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const languageList = [
    {
      name: 'ENG',
      onClick: () => {
        i18n.changeLanguage('en');
      },
      disabled: currentLanguage === 'en',
    },
    {
      name: '中文',
      onClick: () => {
        i18n.changeLanguage('zh-TW');
      },
      disabled: currentLanguage === 'zh',
    },
  ];
  return (
    <>
      {languageList.map(({ name, onClick, disabled }) => (
        <button
          key={name}
          onClick={onClick}
          className='cursor-pointer text-sm text-navy hover:text-gray-400 disabled:text-gray-400 disabled:cursor-default'
          disabled={disabled}
        >
          {name}
        </button>
      ))}
    </>
  );
};

export default LanguageSwitcher;
