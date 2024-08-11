import styled from "styled-components";
import useBanks from "../dashboard/useBanks";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";
import BankAccountCard from "./BankCards";
import AddNewAccount from "./AddNewAccount";


function BankAccountLayout() {
    const { darkMode } = useDarkMode();

    const StyledBankAccountLayout = styled.div`
  display: grid;
grid-template-columns: 1fr 1fr; /* Two columns of equal width */
grid-template-rows: auto auto auto;
gap: 0.4rem;
width: 100%;
border: 1px solid #ccc;
padding: 20px;
border-radius: 8px;
margin: 0 auto;
    background-color: ${darkMode ? '#18212f' : '#f9f9f9'};
`;



    const Value = styled.span`
    color: ${darkMode ? '' : '#555'};
    width: 80rem;
`;
    const { isLoading, banks } = useBanks();
    if (isLoading) return <Spinner />;
    return (
        <StyledBankAccountLayout bankAccount={banks.length}>
            {banks.map(bank => {
                return <BankAccountCard bank={bank} darkMode={darkMode} />
            })}
        </StyledBankAccountLayout>)
}


export default BankAccountLayout