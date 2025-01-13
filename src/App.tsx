import { ThemeProvider } from "./components/ThemeProvider";
import { NotePad } from "./pages/notePad";
import { NavWrapper } from "./wrappers/NavWrapper";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-store">
      <NavWrapper />
      <NotePad />
    </ThemeProvider>
  );
}

export default App;
