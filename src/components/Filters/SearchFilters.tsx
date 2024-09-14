import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/users/usersSlice';
import debounce from 'lodash.debounce';
import { SEARCH_FIELDS } from '../../constants/constants';
type SearchField = (typeof SEARCH_FIELDS)[number];

const SearchFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [selectedField, setSelectedField] = useState<SearchField>('name');

  const updateSearchTerm = debounce((field: SearchField, value: string) => {
    dispatch(setSearchTerm({ field, value }));
  }, 300);

  useEffect(() => {
    updateSearchTerm(selectedField, searchValue);

    return () => {
      updateSearchTerm.cancel();
    };
  }, [selectedField, searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(e.target.value as SearchField);
  };

  const handleReset = () => {
    setSearchValue('');
    dispatch(setSearchTerm({ field: selectedField, value: '' }));
  };

  return (
    <div className="mb-16 flex gap-3 mt-5 items-center">
      <select
        value={selectedField}
        onChange={handleFieldChange}
        className="p-3 h-11 w-64 text-sm rounded border border-gray-300 shadow"
      >
        {SEARCH_FIELDS.map((field) => (
          <option key={field} value={field}>
            Search by {field}
          </option>
        ))}
      </select>
      <div className="relative w-64">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={`Search by ${selectedField}`}
          className="p-3 h-11 w-full text-sm rounded border border-gray-300 shadow"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
