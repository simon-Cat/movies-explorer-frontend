import './Button.css';

const Button = ({ text, externalClass }) => {
  return (
    <>
      <button className={`button ${externalClass}`}>{text}</button>
    </>
  );
};

export default Button;