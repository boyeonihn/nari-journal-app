const Button = ({ text, type, onClick }) => {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
  return (
    <button
      onClick={onClick}
      className={['Button', `Button_${btnType}`].join(' ')}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
};
export default Button;
