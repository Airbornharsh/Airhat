const firstInput = document.getElementById("firstInput");
const uId = document.getElementById("uId");
const secondInput = document.getElementById("secondInput");
const sendBt = document.getElementById("sendButton");
const setNameBt = document.getElementById("setNameButton");
const refreshBt = document.getElementById("refreshButton");
const message = document.getElementById("message");

let serverData;
let childArray = [];
let userId = "";
let userIdName = "";

setNameBt.addEventListener("click", () => {
  secondInput.style.display = "block";
  sendBt.style.display = "block";
  refreshBt.style.display = "block";
  firstInput.style.display = "none";
  setNameBt.style.display = "none";
  uId.style.display = "none";

  for (let i = 0; i < uId.value.length; i++) {
    if (uId.value[i] !== " ") {
      userId += uId.value[i];
    }
  }
  for (let i = 0; i < firstInput.value.length; i++) {
    if (firstInput.value[i] !== " ") {
      userIdName += firstInput.value[i];
    }
  }
  userId = userIdName.toLowerCase() + userId.toLowerCase();
});

refreshBt.addEventListener("click", () => {
  childArray.forEach((element) => {
    element.remove();
  });
  fetch(
    "https://airhat-b6c5f-default-rtdb.asia-southeast1.firebasedatabase.app/chatdata.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      for (const key in response) {
        if (response[key] !== userId) {
          const li = document.createElement("li");
          const p = document.createElement("p");
          const h5 = document.createElement("h5");
          h5.textContent = response[key].name + ": ";
          p.textContent = response[key].value;
          li.append(h5);
          li.append(p);
          childArray.push(li);
          message.append(li);
        }
      }
    });
  childArray = [];
});

sendBt.addEventListener("click", () => {
  let newData;

  fetch(
    "https://airhat-b6c5f-default-rtdb.asia-southeast1.firebasedatabase.app/chatdata.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      newData = response;
      if (secondInput.value) {
        const newObject = {
          name: firstInput.value,
          value: secondInput.value,
        };
        newData[userId] = newObject;
      }
    })
    .then(() => {
      fetch(
        "https://airhat-b6c5f-default-rtdb.asia-southeast1.firebasedatabase.app/chatdata.json",
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      ).then((response) => {
        secondInput.value = "";
      });
    });
});
