import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomButtonPropType = {
  label: string;
  backgroundColor?: string;
  className?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onClick?: () => void;
};

const CustomButton: React.FC<CustomButtonPropType> = ({
  label,
  backgroundColor,
  Icon,
  onClick,
  ...props
}) => {
  return (
    <div {...props}>
      <Button
        variant="contained"
        size="large"
        onClick={onClick}
        fullWidth={true}
        sx={{
          backgroundColor: backgroundColor ? backgroundColor : "#067D68",
          borderRadius: 2,
        }}
      >
        {Icon && (
          <Icon className="text-sm text-inherit mr-3" fontSize="small" />
        )}
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;
