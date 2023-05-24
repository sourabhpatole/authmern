import axios from "axios";
import { useState } from "react";
import "../pages/samplemessage.css";
const SendMessages = () => {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  console.log(message);
  const headers = {
    headers: {
      Authorization: `Bearer EAAbTC4AlIGgBAOLZCf8oFPbw2T8ekGbuJjimWDsU08ncAtpCZCRANpbMvL88AGos8PFfQyis5TJTDprxPpXOULd553s7nvUuYqwY2hNkIaD1IxYnTqmkXHTlDILAk4NrAf7O1NfGtasuxDT7HVdstIci2qtV84AOj1pyRugac9KJhJZAMpVeadz5T5m2HwiFII9rGw3WAZDZD`,
      Accept: "application/json",
    },
  };

  //   console.log(number);
  const sendMsg = () => {
    const textMessage = !message ? "please give food choice" : message;
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `91${number}`,
      type: "text",
      text: {
        preview_url: false,
        body: `${message}`,
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
    <div className="samplemessage">
      <input
        onChange={(e) => setNumber(e.target.value)}
        type="text"
        placeholder="Enter mobile number"
      />
      <textarea type="text" onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendMsg}>Send Msg</button>
    </div>
  );
};

export default SendMessages;
