import { Text } from "@react-pdf/renderer";

const FieldName = ({
  field,
  separator,
}: {
  field: string;
  separator?: boolean;
}) => {
  return (
    <>
      {" "}
      <Text
        style={{
          textDecoration: "underline",
          textTransform: "uppercase",
        }}
      >
        {field}
      </Text>
      {separator ? ", " : " "}
    </>
  );
};

export default FieldName;
