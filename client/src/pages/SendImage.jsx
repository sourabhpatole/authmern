import { useState } from "react";
import axios from "axios";
import "./samplemessage.css";
const SendImage = () => {
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const headers = {
    headers: {
      Authorization: `Bearer EAAbTC4AlIGgBAOLZCf8oFPbw2T8ekGbuJjimWDsU08ncAtpCZCRANpbMvL88AGos8PFfQyis5TJTDprxPpXOULd553s7nvUuYqwY2hNkIaD1IxYnTqmkXHTlDILAk4NrAf7O1NfGtasuxDT7HVdstIci2qtV84AOj1pyRugac9KJhJZAMpVeadz5T5m2HwiFII9rGw3WAZDZD`,
      Accept: "application/json",
    },
  };
  const handleSubmit = () => {
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `91${mobile}`,
      context: {
        message_id: "<MSGID_OF_PREV_MSG>",
      },
      type: "image",
      image: {
        link: `${image}`,
      },
    };
    // console.log("handlesubmit clicked");
    axios
      .post(
        `https://graph.facebook.com/v16.0/121276014242914/messages`,
        body,
        headers
      )
      .then(() => alert("image posted successfully"))
      .catch((err) => console.log("error sending message", err));
  };
  return (
    <div className="sendImage">
      <input
        type="text"
        name="mobile"
        placeholder="Enter Mobile Number"
        id=""
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter image URL"
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Image</button>
    </div>
  );
};

export default SendImage;
