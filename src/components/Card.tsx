type CardType = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Card: React.FC<CardType> = ({ children, ...props }) => {
  // dark mode
  const backgroundColor = "white";

  // light mode
  // const backgroundColor = 'white'

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderRadius: "0.375rem",
        padding: "1.5rem",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
        filter: "drop-shadow",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
