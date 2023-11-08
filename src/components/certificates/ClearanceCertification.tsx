import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CertificateFormTemplate from "./CertificateFormTemplate";
import { CertificateFormTemplatePropType } from "../../utils/types";
import dayjs from "dayjs";
import { getOrdinalDaySuffix } from "../../helper/getOrdinalDaySuffix";
import FieldName from "./FieldName";

const ClearanceCertification = ({
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
      certificationTitle="Barangay Clearance"
      officials={officials}
      validity="Valid within 60 days"
    >
      <Text style={styles.content}>
        <Text>To Whom This May Concern: </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is to certify that
          <FieldName field={residentName} separator />
          is a bonafide resident of #
          <FieldName field={address?.houseNumber.toString()} />
          <FieldName field={address?.streetAddress} />
          Street of Barangay Navotas East, Navotas City, is personally known to
          me to be a person of Good Moral Character, without any criminal
          records, records, no derogatory information against her/his and who
          enjoy a good reputation in this community.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This certification is being
          issued upon her request for the following purpose/s.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <FieldName field={purpose} />
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issued this
          <FieldName field={currentDay + ordinalSuffix} /> day of
          <FieldName field={currentMonth} separator />
          <FieldName field={currentYear.toString()} />
          in the office of Punong Barangay Navotas East, Navotas City.
          {"\n\n\n\n"}
        </Text>
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

export default ClearanceCertification;
