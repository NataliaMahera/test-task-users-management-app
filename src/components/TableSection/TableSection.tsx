import SearchFilter from '../Filters/SearchFilters';
import UsersTable from '../UsersTable/UsersTable';
import Logo from '../../assets/favicon.svg';

const TableSection: React.FC = () => {
  return (
    <section>
      <div className='flex gap-3 justify-start items-baseline'>
      <img src={Logo} alt="Logo" className="h-[18px]" />
        <h1 className="text-2xl  font-bold mb-4">User Management Table</h1>
      </div>
      <hr />
      <p className="text-sm font-normal mt-3 mb-3 text-gray-400 ">
        Enter keywords to filter information of users
      </p>
      <SearchFilter />
      <UsersTable />
    </section>
  );
};

export default TableSection;
