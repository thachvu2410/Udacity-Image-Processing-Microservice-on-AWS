import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';



// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

app.get("/filteredimage", async (req, res) => {
  let serviceFunction = async function (data, deleteLocalFiles) {
    try {
      console.log("abctwgasd1");
      let imgName = await filterImageFromURL(data);
      
      res.json({
        status: "200",
        message: "OK"
      });
      console.log("abctwgasd3");
      // res.sendFile("D:\\Udacity\\Cloud Developer\\Full Stack Apps on AWS\\project2-SourceCode\\"+filteredpath);
      deleteLocalFiles([imgName]);
    } catch (err) {
      console.error(err);
    }
  };

  try {
    let imgURL = req.query.image_url;
    if (!imgURL) {
      return res.status(400).send(`id is required`);
    }
    await serviceFunction(imgURL, deleteLocalFiles);
  } catch (err) {
    console.error(err);
  }

});

//! END @TODO1

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
