import {Bar} from "react-chartjs-2";
import React from "react";
import {deCamelize} from "./utils";

export const StatisticsChart = ({artists, type}) => {

  const data = {
    labels: [deCamelize(type)],
    datasets: artists.map((a, k) => {
      return {
        label: a.name,
        data: [a.statistics[type]],
        backgroundColor: a.color
      }
    })
  }

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  return (
    <Bar
      id='statistics-chart'
      data={data}
      options={options}
      title={deCamelize(type)}
      color="#70CAD1"
    />
  )
}