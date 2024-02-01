import { createApp } from "./app";

async function main() {
  const app = await createApp();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}.`);
  });
}

main();
