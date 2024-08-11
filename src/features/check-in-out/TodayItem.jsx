import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 6rem 27rem 2fr 2fr 11rem 0rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
   white-space: normal;  /* Allows text to wrap naturally */
    word-wrap: break-word; /* Breaks long words if necessary */
    overflow-wrap: break-word; /* Ensures text wraps within the container */
    word-break: break-word;
`;

export default function TodayItem({ activity }) {
  const { id, type, narration, amount,created_at } = activity;

  const dateObject = new Date(created_at);

// Extract the date part (year, month, day)
const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Months are zero-indexed in JS
const day = dateObject.getDate();

// Format as 'YYYY-MM-DD'
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return (
    <StyledTodayItem>
      {type === "CREDIT" && <Tag type="green">CREDIT</Tag>}
      {type === "DEBIT" && <Tag type="red">DEBIT</Tag>}

      {/* <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} /> */}
      <Guest>{narration}</Guest>
      <span>{formatCurrency(amount)}</span>
      <span>{formattedDate }</span>
      <Button
        size="small"
        variation="primary"
        as={Link}
        to={`/payment/${id}`}
      >
        View Details
      </Button>
    </StyledTodayItem>
  );
}
