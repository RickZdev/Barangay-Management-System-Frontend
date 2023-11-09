import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CertificateFormTemplate from "./CertificateFormTemplate";
import { CertificateFormTemplatePropType } from "../../utils/types";
import dayjs from "dayjs";
import { getOrdinalDaySuffix } from "../../helper/getOrdinalDaySuffix";
import FieldName from "./FieldName";

const CertificateOfIndigency = ({
  officials,
  residentName,
  requestedFor,
  purpose,
  address,
}: {
  officials: { officialName: string; position: string }[];
  residentName: string;
  requestedFor: string;
  purpose: string;
  address: {
    houseNumber: number;
    streetAddress: string;
  };
}) => {
  const currentDay = dayjs().date();
  const ordinalSuffix = getOrdinalDaySuffix(currentDay);
  const currentMonth = dayjs().format("MMMM");
  const currentYear = dayjs().get("year");

  return (
    <CertificateFormTemplate
      officials={officials}
      certificationTitle="Certificate of Indigency"
      validity="Valid within 60 days"
      showSecretary={true}
    >
      <Text style={styles.content}>
        <Text>To Whom This May Concern: </Text>
        {"\n\n"}

        <Text>
          <Text style={{ textIndent: 20 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is to certify that{" "}
            <FieldName field={requestedFor} />
            bonafide resident of #
            <FieldName field={address.houseNumber.toString()} />
            <FieldName field={address.streetAddress} /> Street, Navotas East,
            Navotas City.
          </Text>
          {"\n\n"}

          <Text style={{ textIndent: 20 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is to certificates further
            <FieldName field={requestedFor} />
            belongs to one of the indigent families of this Barangay.
          </Text>
          {"\n\n"}

          <Text style={{ textIndent: 20 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This certification is being
            issued upon request of
            <FieldName field={residentName} />
            for his/her application for
            <FieldName field={purpose} />.
          </Text>
          {"\n\n"}

          <Text style={{ textIndent: 20 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issued this
            <FieldName field={currentDay + ordinalSuffix} /> of
            <FieldName field={currentMonth} />,
            <FieldName field={currentYear.toString()} />
            in the office of Punong Barangay, Barangay Navotas East, Navotas
            City.
          </Text>
          {"\n\n\n"}
        </Text>
      </Text>
    </CertificateFormTemplate>
  );
};

// Create styles
const styles = StyleSheet.create({
  content: {
    fontFamily: "Merriweather-Regular",
    fontSize: 11,
    lineHeight: 2,
    textAlign: "justify",
  },
});

export default CertificateOfIndigency;
