const express = require('express');
const {
    requestResource,
    getResources,
    updateResourceStatus
} = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getResources)
    .post(protect, requestResource);

router.route('/:id')
    .put(protect, authorize('admin'), updateResourceStatus);

module.exports = router;
