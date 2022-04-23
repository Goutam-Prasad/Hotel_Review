const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Hotel = require("../models/hotel");

mongoose.connect("mongodb://localhost:27017/hotelReview", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Hotel.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1k = Math.floor(Math.random() * 406);
    const price = Math.floor(Math.random() * 20) + 10;
    const nayahotel = new Hotel({
      //YOUR USER ID
      author: "62641883b2b6502edbefb584",
      location: `${cities[random1k].city}, ${cities[random1k].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1k].longitude, cities[random1k].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png",
          filename: "/ahfnenvca4tha00h2ubt",
        },
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png",
          filename: "YelpCamp/ruyoaxgf72nzpi4y6cdi",
        },
      ],
    });
    await nayahotel.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
