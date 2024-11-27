require('dotenv').config();
const mongoDbSet = process.env.MONGODB_URI;
exports.getHomePage = async (req, res) => {
    try {
      res.render('home/index', { title: 'Home Page',mongoDbSet });
    } catch (err) {
      res.status(500).send('Error fetching data');
    }
  };