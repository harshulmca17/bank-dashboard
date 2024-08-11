import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiBanknotes, HiMiniBanknotes, HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function stats({
  debitAmount, debitTransactionCount, creditAmount, creditTransactionCount, totalAmount
}) {


  const totalTransaction = debitTransactionCount + creditTransactionCount;

  //   const occupancyRate = (totalCheckins / numBookings) * 100;


  return (
    <>
      <Stat
        title="Debited Amount"
        color={"red"}
        icon={<HiMiniBanknotes />}
        value={formatCurrency(debitAmount)}
      />


      <Stat
        title="Credited Amount"
        color={"green"}
        icon={<HiMiniBanknotes />}
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
        color={"green"}
        icon={<HiOutlineBriefcase />}
        value={creditTransactionCount}
      />

      <Stat
        title="Balance"
        color={"blue"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalAmount)}
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
