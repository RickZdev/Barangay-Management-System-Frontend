import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import _ from "lodash";
import BarangayLogo from "../../assets/logo/barangay-logo.png";
import NavotasLogo from "../../assets/logo/navotas-logo.png";
import PinyonFont from "../../assets/fonts/PinyonScript-Regular.ttf";
import MerriweatherRegular from "../../assets/fonts/Merriweather-Regular.ttf";
import MerriweatherItalic from "../../assets/fonts/Merriweather-Italic.ttf";
import MerriweatherBold from "../../assets/fonts/Merriweather-Bold.ttf";
import { CertificateFormTemplatePropType } from "../../utils/types";

const CertificateFormTemplate = ({
  officials,
  certificationTitle,
  certificationSubtitle,
  validity,
  showSecretary,
  children,
}: CertificateFormTemplatePropType & {
  children: React.ReactNode;
}) => {
  const getPositionTitle = (position: string) => {
    switch (position) {
      case "captain":
        return "Punong Barangay";
      case "treasurer":
        return "Treasurer";
      case "admin":
        return "Barangay Administrator";
      case "secretary":
        return "Secretary";
      case "skChairman":
        return "SK Chairman";
      case "kagawad1":
      case "kagawad2":
      case "kagawad3":
      case "kagawad4":
      case "kagawad5":
      case "kagawad6":
      case "kagawad7":
      case "kagawad8":
      case "kagawad9":
        return "Kagawad";
    }
  };

  const captain = _.find(
    officials,
    (official) => official.position === "captain"
  );

  const secretary = _.find(
    officials,
    (official) => official.position === "secretary"
  );

  return (
    <Document title={certificationTitle} pageMode={"fullScreen"}>
      <Page size="A4" style={styles.page}>
        {/* header */}
        <View
          style={{
            paddingTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Image src={BarangayLogo} style={{ width: 80, height: 80 }} />
          <View
            style={{
              textAlign: "center",
              fontSize: 10,
              fontFamily: "Merriweather-Regular",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Merriweather-Bold",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Barangay Navotas East
            </Text>
            <Text style={{ fontFamily: "Pinyon", fontSize: 22 }}>
              Office of the Punong Barangay
            </Text>
            <Text>Estrella cor M. Naval Street, Navotas City</Text>
            <Text>Tel. Nos. 85564432</Text>
          </View>
          <Image src={NavotasLogo} style={{ width: 80, height: 80 }} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderTopColor: "black",
            borderTopWidth: 2,
            borderBottomColor: "black",
            borderBottomWidth: 2,
            margin: 20,
          }}
        >
          {/* left section */}
          <View style={[styles.leftSection]}>
            <Text
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                textAlign: "center",
                fontFamily: "Merriweather-Bold",
                marginBottom: 10,
              }}
            >
              Barangay Council
            </Text>

            {_.map(officials, (official) => (
              <View key={official?.position} style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    fontFamily: "Merriweather-Regular",
                  }}
                >
                  HON. {official?.officialName}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    textTransform: "capitalize",
                    fontFamily: "Merriweather-Italic",
                  }}
                >
                  {getPositionTitle(official?.position)}
                </Text>
              </View>
            ))}
          </View>

          {/* right section / content */}
          <View style={[styles.rightSection, { position: "relative" }]}>
            {/* logo */}
            <View
              style={{
                position: "relative",
                zIndex: 50,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  flex: 1,
                  zIndex: 50,
                  width: "100%",
                  height: 350,
                }}
              >
                <Image
                  src={BarangayLogo}
                  style={{ width: "100%", height: "100%", opacity: 0.1 }}
                />
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                paddingLeft: 20,
                paddingVertical: 20,
                width: "100%",
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.title}>{certificationTitle}</Text>
                {certificationSubtitle && (
                  <Text style={styles.subtitle}>{certificationSubtitle}</Text>
                )}
              </View>

              {children}

              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  gap: 50,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Merriweather-Regular",
                    fontSize: 12,
                  }}
                >
                  <Text>{captain?.officialName}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Merriweather-Italic",
                    }}
                  >
                    Punong Barangay
                  </Text>
                </View>

                {secretary && showSecretary && (
                  <>
                    <View
                      style={{
                        marginTop: -50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Merriweather-Regular",
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        {captain?.officialName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "Merriweather-Italic",
                        }}
                      >
                        Witnessed by:
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Merriweather-Regular",
                        fontSize: 12,
                      }}
                    >
                      <Text>{secretary?.officialName}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "Merriweather-Italic",
                        }}
                      >
                        Secretary
                      </Text>
                    </View>
                  </>
                )}
              </View>

              <View style={{ fontSize: 10, marginTop: 20 }}>
                {validity && <Text>{validity}</Text>}

                <Text>Not valid without seal</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Pinyon",
  src: PinyonFont,
});

Font.register({
  family: "Merriweather-Regular",
  src: MerriweatherRegular,
});

Font.register({
  family: "Merriweather-Italic",
  src: MerriweatherItalic,
});

Font.register({
  family: "Merriweather-Bold",
  src: MerriweatherBold,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  leftSection: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexGrow: 1,
    width: "30%",
    borderRightColor: "black",
    borderRightWidth: 2,
  },
  rightSection: {
    padding: 10,
    flexGrow: 1,
    width: "70%",
  },
  title: {
    fontFamily: "Pinyon",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Merriweather-Bold",
    fontSize: 10,
    letterSpacing: 7,
    textAlign: "center",
  },
  content: {
    fontFamily: "Merriweather-Regular",
    fontSize: 12,
    lineHeight: 2,
  },
});

export default CertificateFormTemplate;
