import 'bootstrap/dist/css/bootstrap.min.css';
import Information from "./components/Information"
import Partners from './components/Partners';


function App() {
  return (
    <div className="App" style={{width: "100%", height: "100vh", backgroundColor: "#171717"}}>
      <div style={{width: "70%", height: "50", margin: "7rem auto"}}>
        <Information />
        <Partners style={{marginTop: "20%"}}/>
      </div>
      
    </div>
  );
}

export default App;
