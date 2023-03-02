import { app } from "./server";

import "dotenv/config";

const PORT = process.env.PORTA;

app.listen(PORT, () => {
  console.log(
    "🚀 Express App has been started\n🍏 Link -> http://localhost:" + PORT,
  );
});

export { app };
