const { app, BrowserWindow } = require("electron");
const path = require("path");
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const readAddress = 0; // адрес регистра для чтения
const writeAddress = 1; // адрес регистра для записи
let lastWriteTime = 0;
let lastReadValue = 0;
let lastWriteValue = 0;
let lastReadValue1;
let lastReadValue2;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});



// открытие соединения с COM-портом
client.connectRTUBuffered("COM9", { baudRate: 115200 }, testing);

async function testing() {
  setInterval(write, 5000);
  setInterval(read, 1000);
}

// функция для генерации псевдослучайного кода
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function write() {
  try {
    const now = Date.now();
    if (now - lastWriteTime >= 5000) {
      // прошло более 5 секунд с последней записи
      client.setID(1);
      const value = getRandomInt(65536);
      client.writeRegisters(writeAddress, [value]); // записываем значение в регистр
      console.log(`Записано значение ${value} в регистр ${writeAddress}`);
      lastWriteValue = value;
      lastWriteTime = now; // обновляем время последней записи
      console.log(
        `Последнее прочитанное значение из регистра ${readAddress}: ${lastReadValue1}`
      );
      console.log(
        `Последнее прочитанное значение из регистра ${
          readAddress + 1
        }: ${lastReadValue2}`
      );
    }
  } catch (e) {
    console.log("ОШИБКА: ", e);
  }
}

async function read() {
  try {
    const { data } = await client.readHoldingRegisters(0, 2);
    lastReadValue1 = data[0];
    lastReadValue2 = data[1];

    console.log(
      `Прочитано значение ${lastReadValue1} из регистра ${readAddress}`
    );
    console.log(
      `Прочитано значение ${lastReadValue2} из регистра ${readAddress + 1}`
    );
  } catch (e) {
    console.log("ОШИБКА: ", e);
  }
}

const plotly = require('plotly')('anryabyh2', 'YdKhJpiJyw4cpxRRyckl'); // подключение к сервису Plotly

const layout = { // настройки лейаута графика
  title: 'Значения первго и второго регистров производительности', // заголовок графика
  xaxis: {
    title: 'Время' // заголовок оси x
  },
  yaxis: {
    title: 'Значение' // заголовок оси y
  }
};

const trace1 = { // данные для первой линии графика
  x: [], // массив временных меток
  y: [], // массив значений lastReadValue1
  mode: 'lines',
  name: 'lastReadValue1'
};

const trace2 = { // данные для второй линии графика
  x: [], // массив временных меток
  y: [], // массив значений lastReadValue2
  mode: 'lines',
  name: 'lastReadValue2'
};

// функция для создания данных графика - создается один раз 
function createGraph() {
  // добавление новых значений в массивы данных
  trace1.x.push(new Date());
  trace1.y.push(lastReadValue1);
  trace2.x.push(new Date());
  trace2.y.push(lastReadValue2);

  // укорачивание массивов данных до 100 элементов
  if (trace1.x.length > 100) {
    trace1.x.shift();
    trace1.y.shift();
  }
  if (trace2.x.length > 100) {
    trace2.x.shift();
    trace2.y.shift();
  }

  // создание массива данных для графика
  const data = [trace1, trace2];

  // настройка опций графика
  const options = {layout: layout, filename: 'lastReadValues', fileopt: 'overwrite'};

  // создание и сохранение графика на сервере Plotly
  plotly.plot(data, options, function (err, msg) {
    if (err) {
      console.log('Ошибка создания графика: ', err);
    } else {
      console.log('График успешно создан: ', msg.url);
    }
  });
}




// вызов функции обновления графика каждую секунду
//setInterval(createGraph, 10000);
