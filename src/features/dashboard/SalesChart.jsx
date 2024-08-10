import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  eachDayOfInterval,
  format,
  getDate,
  isSameDay,
  subDays,
} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({ entries, numDays }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const allDatesStructure = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });


  const data = allDatesStructure.map((date) => {
    return {
      label: format(date, "MMM dd"),

      credit: entries
        .filter(
          (entry) =>
            new Date(entry.created_at).getMonth() == date.getMonth() &&
            new Date(entry.created_at).getDate() == date.getDate() &&
            entry.type === "CREDIT"
        )
        .reduce((acc, cur) => acc + cur.amount, 0),
      debit: entries
        .filter(
          (entry) =>
            new Date(entry.created_at).getMonth() == date.getMonth() &&
            new Date(entry.created_at).getDate() == date.getDate() &&
            entry.type === "DEBIT"
        )
        .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.amount), 0),
    };
  });

  const colors = darkMode
    ? {
      credit: { stroke: "#4f46e5", fill: "#4f46e5" },
      debit: { stroke: "#c52238", fill: "#c52238" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      credit: { stroke: "#4f46e5", fill: "#c7d2fe" },
      debit: { stroke: "#a31629", fill: "#fcdce1" },
      text: "#374151",
      background: "#fff",
    };


  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDatesStructure.at(0), "MMM dd")} &mdash;{""}{" "}
        {format(allDatesStructure.at(-1), "MMM dd")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"₹"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey="credit"
            type="monotone"
            stroke={colors.credit.stroke}
            fill={colors.credit.fill}
            strokeWidth={2}
            name="Total Credited Amount"
            unit={"₹"}
          />
          <Area
            dataKey="debit"
            type="monotone"
            stroke={colors.debit.stroke}
            fill={colors.debit.fill}
            strokeWidth={2}
            name="Total Debited Amount"
            unit={"₹"}
          />{" "}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
