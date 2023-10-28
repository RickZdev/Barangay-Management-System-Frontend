import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomButtonPropType = {
  label: string;
  backgroundColor?: string;
  className?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  isButtonDisabled?: boolean;
};

const SubmitButton: React.FC<CustomButtonPropType> = ({
  label,
  backgroundColor,
  Icon,
  isButtonDisabled,
  ...props
}) => {
  return (
    <div {...props}>
      <Button
        disabled={isButtonDisabled}
        type="submit"
        variant="contained"
        size="large"
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

export default SubmitButton;
