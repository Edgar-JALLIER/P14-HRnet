import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../utils/interface";
import Table from "../components/Table";

const EmployeePage = () => {
  const select = useSelector((state: RootState) => state.user.userInfo);
  return (
    <div id="employee-div" className="container-employees">
      <h1>Current Employees</h1>
      <Table data={select}></Table>
      <Link to="/" className="link-home">
        Home
      </Link>
    </div>
  );
};

export default EmployeePage;
