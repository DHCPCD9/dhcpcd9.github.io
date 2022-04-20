import 'bootstrap/dist/css/bootstrap.min.css';
import Information from "./components/Information"


function App() {
  return (
    <div className="App" style={{width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#171717"}}>
      <div style={{width: "70%", height: "50", margin: "7rem auto"}}>
        <Information />
      </div>
      
    </div>
  );
}

export default App;
