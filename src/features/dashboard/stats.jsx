import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function stats({
  debitAmount, debitTransactionCount, creditAmount, creditTransactionCount, totalAmount
}) {


  const totalTransaction = debitTransactionCount + creditTransactionCount;

  //   const occupancyRate = (totalCheckins / numBookings) * 100;


  return (
    <>
      <Stat
        title="Debit"
        color={"yellow"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(debitAmount)}
      />


      <Stat
        title="Credit"
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(creditAmount)}
      />
      <Stat
        title="Debit Transactions"
        color={"red"}
        icon={<HiOutlineBriefcase />}
        value={debitTransactionCount}
      />
      <Stat
        title="Credit Transactions"
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={creditTransactionCount}
      />

      <Stat
        title="Total Transactions"
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={totalTransaction}
      />
      {/* <Stat
        title="Occupancy Rate"
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      /> */}
    </>
  );
}
