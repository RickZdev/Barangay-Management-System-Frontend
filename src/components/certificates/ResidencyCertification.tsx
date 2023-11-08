import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CertificateFormTemplate from "./CertificateFormTemplate";
import { CertificateFormTemplatePropType } from "../../utils/types";
import dayjs from "dayjs";
import { getOrdinalDaySuffix } from "../../helper/getOrdinalDaySuffix";
import FieldName from "./FieldName";

const ResidencyCertification = ({
  officials,
  residentName,
  address,
  purpose,
}: {
  officials: { officialName: string; position: string }[];
  residentName: string;
  address: {
    houseNumber: number;
    streetAddress: string;
  };
  purpose: string;
}) => {
  const currentDay = dayjs().date();
  const ordinalSuffix = getOrdinalDaySuffix(currentDay);
  const currentMonth = dayjs().format("MMMM");
  const currentYear = dayjs().get("year");

  return (
    <CertificateFormTemplate
      certificationTitle="Barangay Certification"
      certificationSubtitle="For Residency"
      officials={officials}
      validity="Valid within 60 days"
    >
      <Text style={styles.content}>
        <Text>To Whom This May Concern: </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is to certify that
          <FieldName field={residentName} separator />
          bonafide resident of #
          <FieldName field={address?.houseNumber.toString()} />
          <FieldName field={address.streetAddress} />
          Street of Barangay Navotas East, Navotas City.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This further certifies that
          <FieldName field={residentName} />
          is living in the Barangay Navotas East since her/his since birth,
          months, years.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This certification is being
          issued upon request of <FieldName field={residentName} /> as
          requirement for <FieldName field={purpose} />.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issued this
          <FieldName field={currentDay + ordinalSuffix} /> day of
          <FieldName field={currentMonth} separator />
          <FieldName field={currentYear.toString()} />
          in the office of Punong Barangay, Navotas East, Navotas City.
        </Text>
        {"\n\n\n\n"}
      </Text>
    </CertificateFormTemplate>
  );
};

const styles = StyleSheet.create({
  content: {
    fontFamily: "Merriweather-Regular",
    fontSize: 10,
    lineHeight: 2,
    textAlign: "justify",
  },
});

export default ResidencyCertification;
