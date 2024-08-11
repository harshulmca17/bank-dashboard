/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useBankAccountCreate } from "./useBankAccountCreate";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateBankForm({ onCloseModal, cabinToEdit = {} }) {
  console.log(cabinToEdit);
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreateLoading, createAccount } = useBankAccountCreate();

  // const isWorking = isCreateLoading || isEditLoading;
  function onSubmit(data) {


    console.log(data, "data")
    createAccount(data)
    onCloseModal();

    // mutate({ ...data, image: data.image[0] }, editId);
  }
  function onError() { }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Bank Name"} error={errors?.name?.message}>
        {/* <Label htmlFor="name">Cabin name</Label> */}
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Account No."} error={errors?.accountNumber?.message}>
        <Input
          type="number"
          id="accountNumber"
          {...register("accountNumber", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"IFSC"} error={errors?.ifsc?.message}>
        <Input
          type="text"
          id="ifsc"
          {...register("ifsc", {
            required: "This field is required",

          })}
        />
      </FormRow>

      <FormRow label={"Amount"} error={errors?.amount?.message}>
        <Input
          type="number"
          id="amount"
          {...register("amount", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            onCloseModal()
          }}
        >
          Cancel
        </Button>
        <Button disabled={isCreateLoading}>
          Add New Account
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBankForm;
