import { DragEvent, FC, useState } from "react";
import { FilesForm } from "./AddFile.styled";
import * as asn1js from "asn1js";
import CertificateData from '../ CertificateData/ CertificateData';

const AddFile: FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
   const [certificateData, setCertificateData] = useState<any>(null);

  const handleDrag = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const fileList = Array.from(files) as File[];

    console.log("files", files);
    console.log("e", e);

    if (fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      console.log("Зашли в if");

      var sequence = new asn1js.Sequence();
      sequence.valueBlock.value.push(new asn1js.Integer({ value: 1 }));

      var sequence_buffer = sequence.toBER(false); // Encode current sequence to BER (in ArrayBuffer)
      var current_size = sequence_buffer.byteLength;

      console.log(current_size);
      reader.onload = event => {
        const result = event.target?.result;
        if (result) {
          const buffer = new Uint8Array(result as ArrayBuffer);
          const asn1 = asn1js.fromBER(buffer.buffer);

          // Розпарсування даних ASN.1 структури
          const parsedData = asn1.result;
            setCertificateData(parsedData); 
          console.log(parsedData); // Отримані дані з ASN.1 структури

          setFiles([file]);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <FilesForm
        onDragStart={(e: DragEvent<HTMLFormElement>) => handleDrag(e)}
        onDragEnter={(e: DragEvent<HTMLFormElement>) => handleDrag(e)}
        onDragOver={(e: DragEvent<HTMLFormElement>) => handleDrag(e)}
        onDragLeave={handleDragLeave}
        onDrop={(e: DragEvent<HTMLFormElement>) => handleDrop(e)}
        isDragging={isDragging}
      >
        <p>Перетягніть файл сертифікату сюди</p>
        <p>або</p>
      </FilesForm>
      {files.length > 0 && certificateData && (
        <CertificateData certificateData={certificateData} /> // Передача розпарсованих даних компоненту CertificateData
      )}
    </>
  );
};

export default AddFile;
