import {Button, ButtonGroup, Dropdown} from "react-bootstrap";

const SortDropdown = ({filterType, setFilterType}) => {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="secondary">{filterType === 'ascending' ? 'A-Z' : 'Z-A'}</Button>
      <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic"/>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFilterType('ascending')}>Sort A-Z</Dropdown.Item>
        <Dropdown.Item onClick={() => setFilterType('descending')}>Sort Z-A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;