// src/components/PaymentDetails.jsx
import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../utils/helpers';
import { useDarkMode } from '../context/DarkModeContext';
import Tag from './Tag';

const PaymentTitle = styled.h2`
text-align: center;
margin-bottom: 20px;
`;

const PaymentDetailItem = styled.div`
margin-bottom: 10px;
`;

const Label = styled.strong`
display: inline-block;
width: 20rem;
`;

const PaymentDetails = ({ payment }) => {
    const {
        id,
        amount,
        referenceId,
        remark,
        toAccountNumber,
        type,
        paymentReference,
        narration,
        created_at,
    } = payment;
    const { darkMode } = useDarkMode();
    const PaymentDetailsWrapper = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    max-width: 100rem;
    margin: 0 auto;
    background-color: ${darkMode ? '#18212f' : '#f9f9f9'};
`;



    const Value = styled.span`
    color: ${darkMode ? '' : '#555'};
    width: 80rem;
`;
    return (
        <PaymentDetailsWrapper>
            <PaymentDetailItem>
                <Label>Payment ID:</Label> <Value>{id}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Amount:</Label> <Value>{formatCurrency(amount)}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Reference ID:</Label> <Value>{referenceId}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Remark:</Label> <Value>{remark}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>To Account Number:</Label> <Value>{toAccountNumber}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Type:</Label> <Value> {type === "CREDIT" && <Tag type="green">CREDIT</Tag>}
                    {type === "DEBIT" && <Tag type="red">DEBIT</Tag>}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Payment Reference:</Label> <Value>{paymentReference}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Narration:</Label> <Value>{narration}</Value>
            </PaymentDetailItem>
            <PaymentDetailItem>
                <Label>Created At:</Label> <Value>{new Date(created_at).toLocaleString()}</Value>
            </PaymentDetailItem>
        </PaymentDetailsWrapper>
    );
};

export default PaymentDetails;
