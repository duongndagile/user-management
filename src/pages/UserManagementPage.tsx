import { UserManagementMo } from "./userManagement/MO/UserManagementMo";
import { UserManagementPC } from "./userManagement/PC/UserManagementPC";
import "../index.css";

const UserManagementPage = () => {
  return (
    <>
    <div className='hidden md:block w-full mb-8'>
        <UserManagementPC />
    </div>
    <div className='block md:hidden w-full mb-8'>
        <UserManagementMo /> 
    </div>
    </>
  );
};

export default UserManagementPage;
