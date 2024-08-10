import styled from "styled-components";
import Stats from "../dashboard/stats";
// import Heading from "../ui/Heading";
import Spinner from "../../ui/Spinner";

import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";
import useBankStatement from "./useBankStatement";
import useBankId from "./useBankId";
import useRecentStays from "./useRecentStays";
import { useSearchParams } from "react-router-dom";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 0.4rem;
`;

export default function DashboardLayout() {

  const {
    // stays,
    confirmedStays,
    // isLoading: isLoadingStays,
    // numDays,
  } = useRecentStays();

  
  const [searchParams] = useSearchParams();

  // const numbDays = !searchParams.get("last");
  const lastDays = searchParams.get("last")
    ? parseInt(searchParams.get("last"))
    : 30; // default 30 days

  const { isLoading, entries, debitAmount, debitTransactionCount, creditAmount, creditTransactionCount } = useBankStatement();
  const { isLoading: isBankAmountLoading, bank } = useBankId()

  // const finalCabins = cabins?.result || [];
  if (isLoading || isBankAmountLoading) return <Spinner />;

  const { amount } = bank;
  console.log(bank)
  return (
    <StyledDashboardLayout>
      <Stats
        debitAmount={debitAmount}
        debitTransactionCount={debitTransactionCount}
        creditAmount={creditAmount}
        creditTransactionCount={creditTransactionCount}
        totalAmount={amount}
      />
      <Today />
      <DurationChart entries={entries} />
      <SalesChart entries={entries} numDays={lastDays} />
    </StyledDashboardLayout>
  );
}

// [
//   {
//       "duration": "1 Nights",
//       "value": 1,
//       "color": "#b91c1c"
//   },
//   {
//       "duration": "6-7 Nights",
//       "value": 1,
//       "color": "#15803d"
//   },
//   {
//       "duration": "8-14 Nights",
//       "value": 1,
//       "color": "#0f766e"
//   }
// ]