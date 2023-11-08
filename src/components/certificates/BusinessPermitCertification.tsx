import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CertificateFormTemplate from "./CertificateFormTemplate";
import { CertificateFormTemplatePropType } from "../../utils/types";
import dayjs from "dayjs";
import { getOrdinalDaySuffix } from "../../helper/getOrdinalDaySuffix";
import FieldName from "./FieldName";

const BusinessPermitCertification = ({
  officials,
  businessOwner,
  businessName,
  businessNature,
  businessAddress,
  building,
  ownership,
}: {
  officials: { officialName: string; position: string }[];
  businessOwner: string;
  businessName: string;
  businessNature: string;
  businessAddress: string;
  building: "OWNED" | "RENT" | "NOT APPLICABLE";
  ownership:
    | "SINGLE PROPRIETORSHIP"
    | "PARTNERSHIP"
    | "CORPORATION"
    | "INCORPORATED";
}) => {
  const currentDay = dayjs().date();
  const ordinalSuffix = getOrdinalDaySuffix(currentDay);
  const currentMonth = dayjs().format("MMMM");
  const currentYear = dayjs().get("year");

  const checked = "\u2713";

  return (
    <CertificateFormTemplate
      certificationTitle="Barangay Business Permit"
      officials={officials}
    >
      <Text style={styles.content}>
        <Text>Sir/Madam: </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The undersigned respectfully
          request for Barangay Business Permit for the year
          <FieldName field={currentYear.toString()} />.
        </Text>
        {"\n\n"}

        <Text>
          BUSINESS NAME: <FieldName field={businessName} />
          {"\n"}
          NATURE OF BUSINESS: <FieldName field={businessNature} />
          {"\n"}
          ADDRESS: <FieldName field={businessAddress} />
          NAVOTAS EAST NAVOTAS CITY
          {"\n"}
          OWNER: <FieldName field={businessOwner} />
          {"\n"}
          BUILDING: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (
          {building === "OWNED" ? checked : ""}) OWNED
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (
          {building === "RENT" ? checked : ""}) RENT
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (
          {building === "NOT APPLICABLE" ? checked : ""}) NOT APPLICABLE
          {"\n"}
          OWNERSHIP: {"\n\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SINGLE PROPRIETORSHIP
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (
          {ownership === "SINGLE PROPRIETORSHIP" ? checked : " "}) {"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARTNERSHIP
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ({ownership === "PARTNERSHIP" ? checked : " "}) {"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CORPORATION
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ({ownership === "CORPORATION" ? checked : " "}) {"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; INCORPORATED
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ({ownership === "INCORPORATED" ? checked : " "})
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I hereby bind myself further
          subject to the provisions of the existing City Ordinance/Rules and
          Regulations governing the issuance of the permit.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Issued this
          <FieldName field={currentDay + ordinalSuffix} /> day of
          <FieldName field={currentMonth} separator />
          <FieldName field={currentYear.toString()} separator />
          Barangay Navotas East, Navotas City.
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

export default BusinessPermitCertification;
