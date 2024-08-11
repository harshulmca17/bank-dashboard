import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { da } from "date-fns/locale";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 4 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "UPI",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "POS",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "ME ",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "RD ",
    value: 0,
    color: "#22c55e",
  }, {
    duration: "NEFT",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "OTHER",
    value: 0,
    color: "#22c55e",
  }
];

const startDataDark = [
  {
    duration: "UPI",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "POS",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "ME ",
    value: 0,
    color: "#a16207",
  }, {
    duration: "RD ",
    value: 0,
    color: "#4d7c0f",
  }, {
    duration: "NEFT",
    value: 0,
    color: "#0f766e",
  }, {
    duration: "OTHER",
    value: 0,
    color: "#15803d",
  }
];
// const startDataLight = [
//   {
//     duration: "1 Nights",
//     value: 0,
//     color: "#ef4444",
//   },
//   {
//     duration: "2 Nights",
//     value: 0,
//     color: "#f97316",
//   },
//   {
//     duration: "3 Nights",
//     value: 0,
//     color: "#eab308",
//   },
//   {
//     duration: "4-5 Nights",
//     value: 0,
//     color: "#84cc16",
//   },
//   {
//     duration: "6-7 Nights",
//     value: 0,
//     color: "#22c55e",
//   },
//   {
//     duration: "8-14 Nights",
//     value: 0,
//     color: "#14b8a6",
//   },
//   {
//     duration: "15-21 Nights",
//     value: 0,
//     color: "#3b82f6",
//   },
//   {
//     duration: "21+ Nights",
//     value: 0,
//     color: "#a855f7",
//   },
// ];

// const startDataDark = [
//   {
//     duration: "1 Nights",
//     value: 0,
//     color: "#b91c1c",
//   },
//   {
//     duration: "2 Nights",
//     value: 0,
//     color: "#c2410c",
//   },
//   {
//     duration: "3 Nights",
//     value: 0,
//     color: "#a16207",
//   },
//   {
//     duration: "4-5 Nights",
//     value: 0,
//     color: "#4d7c0f",
//   },
//   {
//     duration: "6-7 Nights",
//     value: 0,
//     color: "#15803d",
//   },
//   {
//     duration: "8-14 Nights",
//     value: 0,
//     color: "#0f766e",
//   },
//   {
//     duration: "15-21 Nights",
//     value: 0,
//     color: "#1d4ed8",
//   },
//   {
//     duration: "21+ Nights",
//     value: 0,
//     color: "#7e22ce",
//   },
// ];
function startsWithCheck(str, start) {
  return str.startsWith(start);
}
function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅



  let tempStartData = startData;
  let count = 0;
  const debitStays = stays.filter((stay) => stay.type === "DEBIT");
  debitStays.forEach((stay) => {
    // console.log(stay,accumulator)

    let found = false
    tempStartData.forEach((element, index) => {
      console.log(element, index, stay, startsWithCheck(stay.narration, element.duration))
      if (startsWithCheck(stay.narration, element.duration)) {
        tempStartData[index].value += 1;
        count++;
      }
    });

  });

  tempStartData[tempStartData.length - 1].value = debitStays.length - count;

  let data = tempStartData;
  data = data.filter((obj) => obj.value > 0);
  return data;
}

export default function DurationChart({ entries }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const startData = darkMode ? startDataDark : startDataLight;
  const data = prepareData(JSON.parse(JSON.stringify(startData)), entries)
  return (
    <ChartBox>
      <Heading as="h2">Debit Summary</Heading>
      <ResponsiveContainer width={"100%"} height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey={"duration"}
            dataKey={"value"}
            innerRadius={85}
            outerRadius={110}
          // cx={'40%'}
          // cy={'50%'}
          // paddingAngle={50}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="rigth"
            width={"30%"}
            layout="vertical"
            iconSize={15}
            iconType=""
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
