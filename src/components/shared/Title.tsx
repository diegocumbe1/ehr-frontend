type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return <h1 className="text-2xl font-bold mb-4">{text.toUpperCase()}</h1>;
};

export default Title;
