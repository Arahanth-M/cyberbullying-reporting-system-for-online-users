const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const victimRoute = require("./routes/victims");
const incidentRoute = require("./routes/incidents");
const responderRoute = require("./routes/responders");
const counsellorRoute = require("./routes/counsellors");
const victimCounsellorRoute = require("./routes/Vic_Couns.js");
const actionsRoute = require("./routes/actions");
const incidentResponderRoute = require("./routes/incidentResponder");

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());

app.use("/victims", victimRoute);
app.use("/incidents", incidentRoute);
app.use("/responders", responderRoute);
app.use("/counsellors", counsellorRoute);
app.use("/victimCounsellors", victimCounsellorRoute);
app.use("/actions", actionsRoute);
app.use("/incidentResponder", incidentResponderRoute);




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});