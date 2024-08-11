import { CiBank } from "react-icons/ci";
import BankAccountLayout from "../features/bankAccounts/BankAccountLayout";
import Heading from "../ui/Heading";
import AddNewAccount from "../features/bankAccounts/AddNewAccount";
function BankAccounts() {
    return (
        <>

            <Heading as="h1"><CiBank ></CiBank> Bank Accounts</Heading>
            <BankAccountLayout />
            <AddNewAccount />
        </>
    );
}

export default BankAccounts;
