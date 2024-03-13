import styled from "styled-components";

export const FilesForm = styled.form<{ isDragging: boolean }>`
  border: 1px solid #121212;
  padding: 60px 20px;
  border-radius: 12px;
  background-color: ${({ isDragging }) => (isDragging ? "#141414" : "#ffffff")};
`;
