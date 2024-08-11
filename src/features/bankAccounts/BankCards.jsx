import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';

const BankCard = styled.div`
  background: ${props => props.darkMode ? 'linear-gradient(100deg, #5B99C2, #111827)' : 'linear-gradient(to right, #FAF8F7, #c7c7c7)'};
  border-radius: 10px;
  padding: 20px;
  color: ${props => props.darkMode ? 'white' : '#374151'};;
  width: 90%;
  font-weight:bolder;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const BankName = styled.h2`
  margin: 0 0 10px 0;
`;

const AccountInfo = styled.p`
  margin: 5px 0;
`;

const BankAccountCard = ({ bank, darkMode }) => {
    const { id, name, accountNumber, ifsc, amount } = bank;
    return (
        <BankCard key={id} darkMode={darkMode}>
            <BankName>{name}</BankName>
            <AccountInfo>Account: {accountNumber}</AccountInfo>
            <AccountInfo>IFSC: {ifsc}</AccountInfo>
            <AccountInfo>Balance: {formatCurrency(amount)}</AccountInfo>

        </BankCard>
    );
};

export default BankAccountCard;
