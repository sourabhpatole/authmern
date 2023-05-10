const express = require("express");
const userdb = require("../models/UserSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
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
        const result = { userValid, token };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});

router.get("/validuser", authenticate, async (req, res) => {
  console.log("done");
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
