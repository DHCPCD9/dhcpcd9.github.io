import 'bootstrap/dist/css/bootstrap.min.css';
import Information from "./components/Information"
import Partners from './components/Partners';


function App() {
  return (
    <div className="App" style={{width: "100%", height: "100vh", backgroundColor: "#171717", overflow: "hidden"}}>
        <div style={{position: "absolute", backgroundColor: "#171717"}} className={"w-full"}>
            <div style={{width: "70%", height: "50", margin: "7rem auto"}}>
                <Information />
                <Partners style={{marginTop: "20%"}}/>
            </div>
        </div>

      
    </div>
  );
}

export default App;
