import Rollbar from "rollbar";

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const handler = (req, res) => {
  try {
    if (req.query?.debug === "true") {
      throw new Error("API Error: Rollbar debug");
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error("Error calling /api/rollbar-debug", err);
    rollbar.error("Error calling /api/rollbar-debug", err);
    return res.status(500).send({ message: err.message });
  }
};

export default handler;
