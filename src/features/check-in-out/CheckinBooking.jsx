import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
// import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
// import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import { fetchPaymentById } from "../../services/apiBanks";
import PaymentDetails from "../../ui/PaymentDetails";
import { useDarkMode } from "../../context/DarkModeContext";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { darkMode } = useDarkMode();
  const { bookingId } = useParams();
  const {
    isLoading,
    data: payment,
  } = useQuery({
    queryKey: ["payment", bookingId],
    queryFn: () => fetchPaymentById(bookingId),
    retry: true,
  });

  const { isLoadingSettings } = useSettings();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const { id } =
    payment;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Payment Details #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <PaymentDetails payment={payment} darkMode={darkMode} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

    </>
  );
}

export default CheckinBooking;
