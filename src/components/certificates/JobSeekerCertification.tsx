import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CertificateFormTemplate from "./CertificateFormTemplate";
import { CertificateFormTemplatePropType } from "../../utils/types";
import dayjs from "dayjs";
import { getOrdinalDaySuffix } from "../../helper/getOrdinalDaySuffix";
import FieldName from "./FieldName";

const JobSeekerCertification = ({
  officials,
  residentName,
  residency,
  address,
}: {
  officials: { officialName: string; position: string }[];
  residentName: string;
  residency: string;
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
      certificationTitle="Barangay Certification"
      officials={officials}
      validity="Valid only one year from the issuance."
      showSecretary={true}
    >
      <Text style={styles.content}>
        <Text>To Whom This May Concern: </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is to certify that MR./MS.
          <FieldName field={residentName} separator />
          a resident of #
          <FieldName field={address?.houseNumber.toString()} />
          <FieldName field={address.streetAddress} />
          Street of Barangay Navotas East, Navotas City, for{" "}
          <FieldName field={residency} /> District 3, is a qualified availee of
          R.A. 11261 or the First Time Jobseekers Act of 2019.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I further certify that the
          holder/bearer was informed of his/her rights, including the duties and
          responsibilities accorded by R.A. 11261 through the oath of
          undertaking he has signed and executed in the presence of our barangay
          official.
        </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signed this
          <FieldName field={currentDay + ordinalSuffix} /> day of
          <FieldName field={currentMonth} separator />
          <FieldName field={currentYear.toString()} />
          in the City of Navotas.
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

export default JobSeekerCertification;
