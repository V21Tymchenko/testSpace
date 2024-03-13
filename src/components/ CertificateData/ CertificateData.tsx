import { FC } from "react";

interface CertificateDataProps {
  certificateData: any;
}

const CertificateData: FC<CertificateDataProps> = ({ certificateData }) => {
  const tbsCertificate = certificateData.valueBlock.value[0].valueBlock;
  console.log(" tbsCertificate", tbsCertificate);
//   let commonName, validity, issuerName;

//   // Пошук полів у загальній інформації про сертифікат (TBSCertificate)
//   for (const field of tbsCertificate) {
//     // Знаходимо поле з Common Name
//     if (field.valueBlock.value[0].value === "2.5.4.3") {
//       commonName = field.valueBlock.value[0].valueBlock.value[0].value;
//     }
//     // Знаходимо поле з даними терміну дії (Validity)
//     else if (field.valueBlock.value[0].value === "2.5.29.14") {
//       validity = field.valueBlock.value[0].valueBlock.value[0].value;
//     }
//     // Знаходимо поле з Issuer Name
//     else if (field.valueBlock.value[0].value === "2.5.4.10") {
//       issuerName = field.valueBlock.value[0].valueBlock.value[0].value;
//     }
//   }

//   console.log("Common Name:", commonName);
//   console.log("Термін дії:", validity);
//   console.log("Issuer Name:", issuerName);
//   console.log("cwrtificationData", certificateData);
  console.log(
    "render",
    certificateData.valueBlock.value[0].valueBlock.value[0].valueBlock.value[0]
      .valueBlock.valueDec
  );
  return (
    <div>
      <h2>Certificate Data</h2>
      <p>
        Serial Number:{" "}
        {
          certificateData.valueBlock.value[0].valueBlock.value[0].valueBlock
            .value[0].valueBlock.valueDec
        }
      </p>
      <p>Issuer: {certificateData.issuer}</p>
      <p>Validity: {certificateData.validity}</p>
    </div>
  );
};

export default CertificateData;
