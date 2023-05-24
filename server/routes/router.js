const express = require("express");
const fs = require("fs");
const userdb = require("../models/UserSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const loginHistory = require("../models/LoginSchema");
// for user registration
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await userdb.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new userdb({
        name,
        email,
        password,
        cpassword,
      });

      // here password hasing

      const storeData = await finalUser.save();

      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});

//User Login
router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Fill all the details" });
  }
  try {
    const userValid = await userdb.findOne({ email: email });

    // console.log(userValid.name);
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        // token generate
        const token = await userValid.generateAuthToken();
        // console.log(token);
        // gen cookie
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        let file = fs.createWriteStream("history.txt");
        // let historyArray = [];
        // const lastLogin = userValid.lastLogins.slice(-1)[0].lastLogin;
        const history = new loginHistory({
          email: userValid.email,
          name: userValid.name,
          lastLogins: new Date(),
        });
        userValid.generateUserHistory();
        await history.save();

        const result = { userValid, token };
        res.status(201).json({ status: 201, result });

        // historyArray.push(
        //   ...historyArray,
        //   { email: userValid.email },
        //   { name: userValid.name },
        //   {
        //     lastLogin: new Date(lastLogin).toLocaleString("en-US", {
        //       timeZone: "Asia/Kolkata",
        //     }),
        //   }
        // );
        // loginHistory.(historyArray);
        // console.log(historyArray);
      }
    }
    // generateUserHistory();
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});
router.get("/history", async (req, res) => {
  // console.log("fghdfgfghfgfg");
  // res.json({ message: "hi i am sourabh patole" });
  loginHistory
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/validuser", authenticate, async (req, res) => {
  // console.log("done");
  try {
    const validUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 200, validUserOne });
    // console.log(typeof validUserOne._id);
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
  // try {
  //   const validUserOne = await userdb.findOne({ _id: req.userId });
  //   res.status(201).json({ status: 201, validUserOne });
  // } catch (error) {
  //   res.status(401).json({ status: 401, error });
  // }
});
module.exports = router;
