interface ISectionTitle {
  title: string;
}
const SectionTitle = ({ title }: ISectionTitle) => {
  return (
    <div className='themeBorder defaultBg shadowBorder py-5 mb-4 ml-2 pointer-events-none'>
      {title}
    </div>
  );
};
export default SectionTitle;
