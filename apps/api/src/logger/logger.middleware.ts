import morgan from "morgan";

export function logger() {
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms"
  );
}
