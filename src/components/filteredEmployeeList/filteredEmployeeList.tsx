import { IFiteredEmployeeProps } from '@/types';
import React from 'react';
import FilteredEmployeeItem from './filteredEmployeeItem';
import './_filteredEmployee.scss';

interface IProps {
  employees: IFiteredEmployeeProps[];
  handleSelectedEmployees: (employee: IFiteredEmployeeProps) => void;
}

const FilteredEmployeeList = (props: IProps) => {
  return (
    <ul className="filtered-list">
      {props.employees.map((employee: IFiteredEmployeeProps) => {
        return (
          <FilteredEmployeeItem
            employee={employee}
            handleSelectedEmployees={props.handleSelectedEmployees}
          />
        );
      })}
    </ul>
  );
};

export default FilteredEmployeeList;
