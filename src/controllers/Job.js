import jsonResponse from '@helpers/jsonResponse';
import * as statusCodes from '@constants/statusCodes';
import { JobModel, JobApplicationModel } from '@models';

/**
 * A class to manage job postings
 */
class JobController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getJobs(req, res) {
    const jobs = await JobModel.find();
    return jsonResponse({ res, data: jobs });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getApplications(req, res) {
    const applications = await JobApplicationModel.find()
      .where({ job: req.params.jobId })
      .limit(10)
      .populate('applicant', ['firstName', 'lastName', 'email', 'phoneNumber'])
      .populate('job')
      .exec();

    return jsonResponse({ res, data: applications });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getRecruiterJobs(req, res) {
    const jobs = await JobModel.find().where({ postedBy: String(req.currentUserId) });
    return jsonResponse({ res, data: jobs });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async postJob(req, res) {
    const newJob = await JobModel.create({ ...req.body, postedBy: req.currentUserId });

    return jsonResponse({ status: statusCodes.HTTP_CREATED, res, data: newJob });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getJobDetails(req, res) {
    const job = await JobModel.findById(req.params.jobId);

    if (job) {
      return jsonResponse({ res, data: job });
    }

    return jsonResponse({
      status: statusCodes.HTTP_NOT_FOUND,
      res,
      message: 'Job not found.',
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getJobApplications(req, res) {
    const { jobId } = req.params;
    const jobApplications = await JobApplicationModel.find()
      .where({ job: jobId })
      .populate('job')
      .populate('applicant')
      .exec();

    if (jobApplications) {
      return jsonResponse({ res, data: jobApplications });
    }
    return jsonResponse({ res, status: statusCodes.HTTP_NOT_FOUND, message: 'This job has not applications yet.' });
  }
}

export default JobController;
