interface ISectionTitle {
  title?: string;
  children?: React.ReactNode;
}
const SectionTitle = ({ title, children }: ISectionTitle) => {
  return (
    <div className='themeBorder defaultBg shadowBorder py-5 mb-4 ml-2 pointer-events-none'>
      {title}
      {children}
    </div>
  );
};
export default SectionTitle;
