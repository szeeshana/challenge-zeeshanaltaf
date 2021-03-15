const express = require('express');
const CaseStudy = require('../models/caseStudy')
const router = new express.Router()
const { check, validationResult } = require('express-validator');

router.post('/', createValidationFor('case-study'),
  checkValidationResult
  , async (req, res) => {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;
      const data = await CaseStudy.aggregate([
        { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
        { $project: { _id: 0, key: "$key", createdAt: "$createdAt", totalCount: { "$sum": "$counts" } } },
        { $match: { totalCount: { $lte: maxCount, $gte: minCount } } }
      ]);
      console.log(data.length);
      res.send({ code: 0, msg: "Success", records: data })
    } catch (e) {
      throw new Error(e);
    }
  })
function createValidationFor(route) {
  switch (route) {
    case 'case-study':
      return [
        check('startDate').not().isEmpty().withMessage('StartDate is missing'),
        check('endDate').not().isEmpty().withMessage('EndDate is missing'),
        check('minCount').not().isEmpty().withMessage('MinCount is missing'),
        check('maxCount').not().isEmpty().withMessage('MaxCount is missing'),
      ];

    default:
      return [];
  }
}

function checkValidationResult(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(422).json({ errors: result.array() });
}
module.exports = router