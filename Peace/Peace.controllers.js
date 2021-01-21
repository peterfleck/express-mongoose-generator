import Peace from './Peace.model.js';

    export function list (req, res) {
        Peace.find(function (err, Peaces) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Peace.',
                    error: err
                });
            }
            return res.json(Peaces);
        });
    }


    export function show (req, res) {
        let id = req.params.id;
        Peace.findOne({_id: id}, function (err, Peace) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Peace.',
                    error: err
                });
            }
            if (!Peace) {
                return res.status(404).json({
                    message: 'No such Peace'
                });
            }
            return res.json(Peace);
        });
    }

    export function create (req, res) {
        let Peace = new Peace({
			AString : req.body.AString,
			ANumber : req.body.ANumber
        });

        Peace.save(function (err, Peace) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Peace',
                    error: err
                });
            }
            return res.status(201).json(Peace);
        });
    }

    export function update (req, res) {
        let id = req.params.id;
        Peace.findOne({_id: id}, function (err, Peace) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Peace',
                    error: err
                });
            }
            if (!Peace) {
                return res.status(404).json({
                    message: 'No such Peace'
                });
            }

            Peace.AString = req.body.AString ? req.body.AString : Peace.AString;
			Peace.ANumber = req.body.ANumber ? req.body.ANumber : Peace.ANumber;
			
            Peace.save(function (err, Peace) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Peace.',
                        error: err
                    });
                }

                return res.json(Peace);
            });
        });
    }

    export function remove (req, res) {
        let id = req.params.id;
        Peace.findByIdAndRemove(id, function (err, Peace) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Peace.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }

