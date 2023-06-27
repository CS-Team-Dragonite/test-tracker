import db from '../models/testTrackerModel.js';

const featuresController = {
  // get full list of features from DB for specific user
  getFeaturesList: async (req, res, next) => {
    console.log('<--featuresController - getFeaturesList is invoked-->');

    const { userId } = req.user;

    try {
      const query = `SELECT _id AS id, feature_name, description, created_on FROM feature WHERE feature.user_id = $1`;

      const values = [userId];

      const data = await db.query(query, values);

      // validate data before storage
      if (!data.rows.length) throw new Error;
      res.locals.featuresList = await data.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in getFeaturesList controller method: ${err}`,
        status: 500,
        message: 'Error while retrieving data',
      });
    }

  },

  // create a new feature in DB for specific user
  createFeature: async (req, res, next) => {
    console.log('<--featuresController - createFeature is invoked-->');

    const { featureName, description } = req.body;
    const { userId } = req.user;

    // TODO: update DB to allow _id be non-null & remove _id query & 25 from values

    try {
      const query = `INSERT INTO feature(_id, feature_name, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`;

      const values = [25, featureName, description, userId];

      const newFeature = await db.query(query, values);

      // validate wehtehr new Feature is successfully added to DB
      if (!newFeature.rows[0]) throw new Error;
      return next();
    } catch (err) {
      return next({
        log: `Error in createFeature controller method: ${err}`,
        status: 500,
        message: 'Error while adding data',
      });
    }
  }

};

export default featuresController;