const app = require("./App");

const PORT = process.env.PORT || 3001;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
