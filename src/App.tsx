import Carousel from "./Pages/Carousel/Carousel";
import './App.css'
const App: React.FC = () => {
  console.log(process.env.NODE_ENV )
  return (
    <>
      <h1>Machine Coding In TypeScript... </h1>
      <Carousel />
    </>
  );
};

export default App;
