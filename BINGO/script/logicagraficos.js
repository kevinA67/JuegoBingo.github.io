const graf = document.getElementById("grafico1");
const graf2 = document.getElementById("grafico2");
const graf3 = document.getElementById("grafico3");
const graf4 = document.getElementById("grafico4");

const partidas = ["Partidas"];

//facil-1
const facil_ganadas = [2];
const facil_perdidas = [1];

//dificil-2
const dificil_ganadas = [4];
const dificil_perdidas = [9];

//facil vs dificil-3
const p_facil = [4];
const p_dificil = [9];

//facil vs dificil-4
const p_completas = [8];
const p_incompletas = [30];

//Grafico facil
const partidas1 = ["Ganadas", "Perdidas"];
const data1 = {
  labels: partidas1,
  datasets: [
    {
      data: [2, 1],
      backgroundColor: ["rgba(130, 40, 145, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1.5,
    },
  ],
};
const config1 = {
  type: "pie",
  data: data1,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dificultad Facil",
      },
    },
  },
};
new Chart(document.getElementById("grafico1"), config1);

//Grafico dificil
const GraficoDificil = new Chart(graf2, {
  type: "bar",
  data: {
    labels: partidas,
    datasets: [
      {
        label: "Ganadas",
        data: dificil_ganadas,
        backgroundColor: ["rgba(130, 40, 145, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1.5,
      },
      {
        label: "Perdidas",
        data: dificil_perdidas,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1.5,
      },
    ],
  },
});

//Grafico facil
const partidas3 = ["Facil", "Dificil"];
const data3 = {
  labels: partidas3,
  datasets: [
    {
      data: [4, 9],
      backgroundColor: ["rgba(130, 40, 145, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1.5,
    },
  ],
};
const config3 = {
  type: "pie",
  data: data3,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Partidas Jugadas",
      },
    },
  },
};
new Chart(document.getElementById("grafico3"), config3);

const Grafico_CI = new Chart(graf4, {
  type: "bar",
  data: {
    labels: partidas,
    datasets: [
      {
        label: "Completas",
        data: p_completas,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1.5,
      },
      {
        label: "Incompletas",
        data: p_incompletas,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1.5,
      },
    ],
  },
});
