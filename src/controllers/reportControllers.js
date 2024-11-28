exports.getReport = async (req, res) => {
    try {
        res.render('reports/index', { title: 'Reports', message: 'Reports management' });
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
};