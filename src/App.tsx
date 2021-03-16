import './App.css';
import Count from './Count';
import Count2 from './Count2';
import { Provider } from './redux/react-redux';

const App = () => {
  return (
    <Provider useLogger>
      <Count />
      <Count2 />
    </Provider>
  )
}

export default App;
