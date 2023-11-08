import { Text, View, StyleSheet } from "@react-pdf/renderer";
import CertificateFormTemplate from "./CertificateFormTemplate";
import { CertificateFormTemplatePropType } from "../../utils/types";
import dayjs from "dayjs";
import { getOrdinalDaySuffix } from "../../helper/getOrdinalDaySuffix";
import FieldName from "./FieldName";

const JobSeekerFirstCertification = ({
  officials,
  residentName,
  age,
  residency,
  address,
}: {
  officials: { officialName: string; position: string }[];
  residentName: string;
  age: number;
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
      showSecretary={true}
    >
      <Text style={styles.content}>
        <Text>To Whom This May Concern: </Text>
        {"\n\n"}

        <Text style={{ textIndent: 20 }}>
          I
          <FieldName field={residentName} separator />
          <FieldName field={age.toString()} />
          of age, a resident of
          <FieldName field={address?.houseNumber.toString()} />
          <FieldName field={address.streetAddress} />
          Street, Navotas East, Navotas City, and living in Barangay Navotas
          East for <FieldName field={residency} />. Availing the benefits of RA
          no. 112621, otherwise known as the First Time Jobseekers Act of 2019,
          do hereby declared, agree and undertake to abide and be bound by the
          following: {"\n\n"}
        </Text>
      </Text>

      {/* paragraphs */}
      <View style={styles.content}>
        <Paragraph number="1">
          This is the time that I will actively look for a job, and therefore
          requesting that a Barangay Certificate be issued in any favor to avail
          the benefits of the law;
        </Paragraph>

        <Paragraph number="2">
          That I am aware that the benefits and privilege/s under the said law
          shall be valid for one (1) year from the date the Barangay Certificate
          issued;
        </Paragraph>

        <Paragraph number="3">
          That I can avail the benefit of the law only once:
        </Paragraph>

        <Paragraph number="4">
          That I understand that my personal information shall be included in
          the Roaster /list of the First Time Jobseekers and will not be used
          for any unlawful purpose:
        </Paragraph>

        <Paragraph number="5">
          That I will inform and/or report to the Barangay personally through
          test o rother means, of through my family/relatives once I get
          employed, and
        </Paragraph>

        <Paragraph number="6">
          That I am not beneficiary of the Job start program under RA No. 10869
          and other laws that give similar exemption for the documents or
          transactions exempted under RA No. 11261;
        </Paragraph>

        <Paragraph number="7">
          That if issued the requested certification, I will not use the same in
          any fraud, neither falsify nor help and/or assist in the fabrication
          of the said certification;
        </Paragraph>

        <Paragraph number="8">
          That this undertakings is made solely for the purpose of obtaining a
          barangay certificate consistent with the RA No. 11261 and not for any
          other purpose;
        </Paragraph>

        <Paragraph number="9">
          That consistent to the use of any personal information pursuant to the
          data privacy Act and other applicable laws, rules and regulations.
        </Paragraph>

        <Text style={{ textIndent: 20 }}>
          {"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signed this{" "}
          <FieldName field={currentDay + ordinalSuffix} /> day of
          <FieldName field={currentMonth} separator />
          <FieldName field={currentYear.toString()} />
          {"\n\n\n\n"}
        </Text>
      </View>

      {/* footer */}
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 50,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Merriweather-Regular",
            fontSize: 10,
          }}
        >
          <FieldName field={residentName} />
          <Text
            style={{
              fontSize: 9,
              fontFamily: "Merriweather-Italic",
              textAlign: "center",
            }}
          >
            First Time Jobseeker
          </Text>
        </View>
      </View>
    </CertificateFormTemplate>
  );
};

const Paragraph = ({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <View>
        <Text>{number}.</Text>
      </View>

      <View style={{ paddingLeft: 20 }}>
        <Text>
          {children} {"\n"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    fontFamily: "Merriweather-Regular",
    fontSize: 8.5,
    lineHeight: 1.5,
    textAlign: "justify",
  },
});

export default JobSeekerFirstCertification;
