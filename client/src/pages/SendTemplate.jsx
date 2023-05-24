import axios from "axios";
import { useState } from "react";
import "../pages/samplemessage.css";
const SendTemplate = () => {
  const [number, setNumber] = useState("");
  // const [message] = useState("");
  // console.log(message);

  const headers = {
    headers: {
      Authorization: `Bearer EAAbTC4AlIGgBAOLZCf8oFPbw2T8ekGbuJjimWDsU08ncAtpCZCRANpbMvL88AGos8PFfQyis5TJTDprxPpXOULd553s7nvUuYqwY2hNkIaD1IxYnTqmkXHTlDILAk4NrAf7O1NfGtasuxDT7HVdstIci2qtV84AOj1pyRugac9KJhJZAMpVeadz5T5m2HwiFII9rGw3WAZDZD`,
      Accept: "application/json",
    },
  };

  //   console.log(number);
  const sendMsg = () => {
    const body = {
      messaging_product: "whatsapp",
      to: `91${number}`,
      type: "template",
      template: {
        name: "food_dept",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "text",
                text: ",",
              },
            ],
          },
        ],
      },
    };
    axios
      .post(
        `https://graph.facebook.com/v16.0/121276014242914/messages`,
        body,
        headers
      )
      .then((res) => {
        alert("message send successfully", res);
      })
      .catch((err) => {
        console.log("error sending message", err);
      });
  };

  return (
    <div className="sendTemplate">
      <input
        onChange={(e) => setNumber(e.target.value)}
        type="text"
        placeholder="Enter mobile number"
      />
      <button onClick={sendMsg}>Send Template</button>
    </div>
  );
};

export default SendTemplate;
