import { useSelector } from 'react-redux';
import { Loader } from './components/Loader/Loader';
import { selectIsLoading } from './redux/users/userSelectors';
import TableSection from './components/TableSection/TableSection';


const App: React.FC = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <main className="container mx-auto p-4">
      {isLoading && <Loader />}
      <TableSection />
    </main>
  );
};

export default App;
