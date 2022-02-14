import { IFiteredEmployeeProps } from '@/types';
import React from 'react';
import './_filteredEmployee.scss';

interface IProps {
  employee: IFiteredEmployeeProps;
  handleSelectedEmployees: (employee: IFiteredEmployeeProps) => void;
}

const FilteredEmployeeItem = (props: IProps) => {
  return (
    <li key={`${props.employee.id}-uniqueId`}>
      <div
        className="filtered-list__employee"
        onClick={() => props.handleSelectedEmployees(props.employee)}
      >
        <div className="filtered-list__employee__name">{props.employee.name}</div>
        <div className="filtered-list__employee__email">{props.employee.email}</div>
      </div>
    </li>
  );
};

export default FilteredEmployeeItem;
