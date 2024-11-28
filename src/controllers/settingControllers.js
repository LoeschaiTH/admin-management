exports.setting = async (req, res) => {
    try {
        res.render('setting/index', { title: 'Settings', message: 'Setting' });
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
}