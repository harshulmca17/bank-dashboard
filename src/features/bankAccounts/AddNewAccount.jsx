import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal-v1';
import CreateBankForm from './CreateBankForm';

const CardContainer = styled.div`
    border-radius: 10px;
  padding: 20px;
  color: white;
  width: 100%;
  margin: 10px;
`;

const Card = styled.div`
  border-radius: 10px;
  padding: 20px;
  color: white;
  width: 100%;
  margin: 10px;
`;




const AddNewAccount = () => {
    return (
        <CardContainer>
            <Card>
                <Modal>
                    <Modal.Open opens="bank-account-form">
                        <Button> Add New Account</Button>
                    </Modal.Open>
                    <Modal.Window name="bank-account-form">
                        <CreateBankForm />
                    </Modal.Window>

                </Modal>
            </Card>
        </CardContainer>
    );
};

export default AddNewAccount;