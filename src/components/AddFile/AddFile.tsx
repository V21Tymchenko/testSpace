import { DragEvent, FC, useState } from "react";
import { FilesForm } from "./AddFile.styled";
import * as asn1js from "asn1js";
import CertificateData from "../ CertificateData/ CertificateData";
import { ThemeConsumer } from "styled-components";
import { rejects } from "assert";

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

function maxSumFromTopToBottom(triangle) {
  const n = triangle.length;

  // Створюємо матрицю dp для зберігання проміжних результатів
  const dp = new Array(n).fill().map(() => new Array(n).fill(0));
  console.log("dp", dp);

  //Починаємо з копіювання останнього рядка трикутника у матрицю dp
  for (let i = 0; i < n; i++) {
    dp[n - 1][i] = triangle[n - 1][i];
  }

  // Проходимося по решті рядків трикутника знизу вгору
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      // Для кожної клітинки dp [i] [j], знаходимо максимум з двох сусідніх клітинок у наступному рядку трикутника і додаємо до поточної клітинки
      dp[i][j] = triangle[i][j] + Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }

  // dp[0][0] містить максимальну кількість балів під час спуску з гори
  return dp[0][0];
}

// Приклад використання
const triangle = [
  [6],
  [7, 10],
  [12, 11, 9],
  [90, 25, 13, 14],
  [1, 113, 118, 2, 4],
];
const result = maxSumFromTopToBottom(triangle);
console.log(result);

