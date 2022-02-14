import React, { useEffect, useState, KeyboardEvent } from 'react';

import { getEmployees } from '@/config/api';
import { managerSearchPlaceHolder } from '@/const';
import { IFiteredEmployeeProps } from '@/types';
import FilteredEmployeeList from '../filteredEmployeeList/filteredEmployeeList';
import './_search.scss';

const SearchWrapper = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [employees, setEmployees] = useState<IFiteredEmployeeProps[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<IFiteredEmployeeProps[]>([]);
  const [isfilterApplied, setIsfilterApplied] = useState<boolean>(false);
  const [showFilteredList, setShowFilteredList] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      //data fetch
      try {
        const response = await getEmployees();
        const employeeData = response.data.map((manager: any) => {
          const email = response.included.filter(
            (employee: IFiteredEmployeeProps) =>
              employee.id === manager.relationships.account.data.id
          );
          const {
            attributes: { name }
          } = manager;
          return {
            id: manager.id,
            name,
            email: email[0].attributes.email
          };
        });
        setEmployees(employeeData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSelectedEmployees = (employee: IFiteredEmployeeProps) => {
    setSelectedEmployee(employee.name);
    setShowFilteredList(false);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // enter key
    if (event.keyCode === 13) {
      setFilteredEmployees(filteredEmployees);
      const name = filteredEmployees.length && filteredEmployees[0].name;
      setSelectedEmployee(name);
      setShowFilteredList(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // on change event
    const { value } = event.target;
    const filteredEmployees = employees.filter((employee: IFiteredEmployeeProps) => {
      const employeeName = employee.name.replace(/\s+/g, '').toLowerCase();
      return employeeName.includes(value.toLowerCase().replace(/\s+/g, ''));
    });
    if (filteredEmployees.length) {
      setFilteredEmployees(filteredEmployees);
      setShowFilteredList(true);
      setIsfilterApplied(true);
    } else {
      setShowFilteredList(false);
      setFilteredEmployees([]);
    }
    setSelectedEmployee(value);
  };

  const handleOnFocus = () => {
    if (employees && employees.length) {
      setShowFilteredList(true);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={selectedEmployee}
        onChange={handleChange}
        placeholder={managerSearchPlaceHolder}
        className="search"
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        onClick={handleOnFocus}
      />
      {employees.length > 0 && showFilteredList && (
        <FilteredEmployeeList
          employees={isfilterApplied ? filteredEmployees : employees}
          handleSelectedEmployees={handleSelectedEmployees}
        />
      )}
    </div>
  );
};

export default SearchWrapper;
