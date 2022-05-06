import 'bootstrap/dist/css/bootstrap.min.css';
import Information from "./components/Information"
import Partners from './components/Partners';
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App" style={{width: "100%", height: "100vh", backgroundColor: "#171717", overflow: "hidden"}}>
        <div style={{position: "absolute", backgroundColor: "#171717"}} className={"w-full"}>
          <div className="intro" style={{maxHeight: "100vh"}}>
                <Information />
          </div>
          <div className="intro">
                <Partners />
          </div>
            <Footer />


        </div>

      
    </div>
  );
}

export default App;
