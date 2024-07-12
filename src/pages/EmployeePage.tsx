import { Link } from "react-router-dom";

const EmployeePage = () => {
  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="display"></table>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeePage;
