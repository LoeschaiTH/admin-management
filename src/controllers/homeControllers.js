exports.getHomePage = async (req, res) => {
  console.log("seeeee");
    try {
      res.render('home/index', { title: 'Home Page' });
    } catch (err) {
      res.status(500).send('Error fetching data');
    }
  };