import MainPageScreen from '../../pages/main-page-screen/main-page-screen';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
  return <MainPageScreen offersCount = {offersCount}/>;
}

export default App;
