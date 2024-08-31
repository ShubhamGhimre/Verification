const port = 5000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var whitelist = ["http://localhost:5173", ""];
var corsOptions = { origin: whitelist, credentials: true };
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Express app is runnung");
});
// generate otp
function generateOTP() {
  // function to generate 6 digit otp random
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// generate otp and send it to the user
app.post("/sendcode", (req, res) => {
  try {
    otp = generateOTP();
    console.log(`Sending OTP: ${otp}`);
    res.json({
      success: true,
      message: "OTP sent successfully: " + otp,
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the code." + error,
    });
  }
});

// verify the otp
app.post("/verify", (req, res) => {
  
  const userOTP = req.body.otp;
  console.log(`User entered OTP: ${userOTP}`);


  const OTP = otp;
  console.log(`OTP: ${OTP}`);

  if (userOTP == OTP) {
    res.json({
      success: true,
      message: "OTP is verified",
    });
  } else {
    res.json({
      success: false,
      message: "Invalid OTP",
    });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("server is running on port " + port);
  } else {
    console.log("Error in running server", +error);
  }
});
