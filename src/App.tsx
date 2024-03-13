import Button from "./components/Button";
import { MainContainer, Text } from "./App.styled";
import AddFile from "./components/AddFile";

function App() {
  return (
    <MainContainer>
      <div>
        <Button text="Додати" />
        <Text>Нема жодного сертифікату</Text>
      </div>

      <AddFile />
    </MainContainer>
  );
}

export default App;
