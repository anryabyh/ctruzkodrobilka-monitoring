/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// create an empty modbus client
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// open connection to a serial port
// client.connectRTUBuffered("/dev/ttyUSB1", { baudRate: 115200 }, write);
client.connectRTUBuffered("COM7", { baudRate: 115200 }, read());


console.log(read());
 function write() {
    try {
        client.setID(1);

        // write the values 0, 0xffff to registers starting at address 5
        // on device number 1.
        client.writeRegisters(0, [100]) // [0 , 0xffff]
            .then(read);
    } catch (e) {
        console.log("ОШИБКА: ", e)
    }
}
async function read(value) {
    try {
        // read the 2 registers starting at address 5
        // on device number 1.
        client.readHoldingRegisters(0, 1)
            .then(value);
    } catch (e) {
        console.log("ОШИБКА: ", e)
    }
}




















var input_sber_available_money = 0;
var input_tink_available_money = 0;
var my_token = "Установить токен";

// input_sber_available_money = document.getElementById('inp_sber1').value;
// alert(input_sber_available_money);

// $(document).on("inp_sber1", function(ev){
//     console.log($(ev.target).value());
// })
function inp_my_token() {
  my_token = document.getElementById("inp_token").value;
  console.log(my_token);
  h3_token.innerHTML="Ваш токен: "+my_token;
  h3_token2.innerHTML=my_token.slice(0,5);
}
function inp_izm() {
  input_sber_available_money = document.getElementById("inp_sber1").value;
  input_tink_available_money = document.getElementById("inp_tink1").value;
  console.log(input_sber_available_money);
  console.log(input_tink_available_money);
}

const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');
const menu = document.querySelector('.menu');

// Обработчик клика на кнопку-переключатель
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// Обработчик клика на ссылку в списке
menuList.addEventListener('click', (event) => {
  // Предотвращаем переход по ссылке
  event.preventDefault();

  // Скрываем меню после клика на ссылку
  menu.classList.remove('open');

  // Получаем адрес, на который указывает ссылка
  const targetUrl = event.target.getAttribute('href');

  // Переходим на указанный адрес
  window.location.href = targetUrl;
});


//  var chek1_sber =  document.getElementById("ch");
// function fun(){
//     if (chek1_sber.checked)
//      { alert("Чекбокс нажат -вариант №2"); }
//      else { alert("Чекбокс не нажат-вариант №2"); }
//     }

function boxdisable() {
  if (document.getElementById("switch-1").checked) {
    console.log("Ваша кнопка включена");
  } else {
    console.log("Ваша кнопка выключена");
  }
}
function boxdisable2() { if (document.getElementById("switch-1").checked) {
    console.log("Ваша кнопка включена");
  } else {
    console.log("Ваша кнопка выключена");
  }}



document.getElementById("btn_start_end").onclick = function () {
  if (this.textContent == "Старт") {
    console.log("kek");
    this.textContent = "Выключить";
    this.classList.add("btn_end");
    document.getElementById("btn_token").setAttribute("disabled", "disabled");
  } else {
    this.textContent = "Старт";
    this.classList.remove("btn_end");
    document.getElementById("btn_token").removeAttribute("disabled");
  }
};

document.getElementById("btn_token").onclick = function () {
  var block1 = document.getElementById("block_1");
  var block2 = document.getElementById("block_2");
  if (block1.style.display == "flex") {
    block1.style.display = "none";
    block2.style.display = "flex";
  } else {
    block2.style.display = "none";
    block1.style.display = "flex";
  }
};
document.getElementById("btn_otm").onclick = function () {
  var block1 = document.getElementById("block_1");
  var block2 = document.getElementById("block_2");
  if (block2.style.display == "flex") {
    block1.style.display = "flex";
    block2.style.display = "none";
  } else {
    block1.style.display = "none";
    block2.style.display = "flex";
  }
};
document.getElementById("btn_save").onclick = function () {
  var block1 = document.getElementById("block_1");
  var block2 = document.getElementById("block_2");
  if (block2.style.display == "flex") {
    block1.style.display = "flex";
    block2.style.display = "none";
  } else {
    block1.style.display = "none";
    block2.style.display = "flex";
  }
};
