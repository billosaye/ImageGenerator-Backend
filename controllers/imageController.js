
import Image from '../Models/imageModel.js';

export const generateImage = async (req, res) => {
  try {
    const { description } = req.body;

    const response = await fetch("https://open-ai21.p.rapidapi.com/texttoimage2", {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": "open-ai21.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: description }),
    });

    const data = await response.json();

    if (data && data.generated_image) {
      const newImage = new Image({
        description,
        url: data.generated_image,
      });

      await newImage.save();

      res.json({ imageUrl: data.generated_image });
    } else {
      throw new Error("Image URL not found in the response");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }).limit(20);
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};