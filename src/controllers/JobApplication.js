import jsonResponse from '@helpers/jsonResponse';
import * as statusCodes from '@constants/statusCodes';
import { JobApplicationModel, JobModel } from '@models';
import uploadFile from '@helpers/cloudinary';
/**
 * A class to manage job postings
 */
class JobApplication {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getApplications(req, res) {
    const applications = await JobApplicationModel.find()
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
  static async applyForJob(req, res) {
    const { jobId } = req.params;
    const job = await JobModel.findById(jobId);
    let cvFile = null;
    if (req.files?.cvFile) {
      cvFile = await uploadFile(req.files.cvFile);
    } else {
      return jsonResponse({
        res,
        status: statusCodes.HTTP_BAD_REQUEST,
        message: 'Please upload a cv file',
      });
    }

    if (job) {
      // check previous applications
      const previousApplication = await JobApplicationModel.find().where({
        job: jobId,
        applicant: req.currentUserId,
        cvFile: cvFile.url,
      });

      if (previousApplication) {
        return jsonResponse({
          status: statusCodes.HTTP_CONFLICT,
          res,
          message: 'You have already applied for this job',
        });
      }
      // save application
      const newApplication = await JobApplicationModel.create({ job: jobId, applicant: req.currentUserId });
      return jsonResponse({ status: statusCodes.HTTP_CREATED, res, data: newApplication });
    }

    return jsonResponse({
      status: statusCodes.HTTP_BAD_REQUEST,
      res,
      message: 'Job is closed or is not accepting applications.',
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getJobApplicationDetails(req, res) {
    let application = await JobApplicationModel.findById(req.params.applicationId);

    if (application) {
      application = await application.populate('job', ['title', 'pay-range', 'description']);
      application = await application.populate('applicant', ['firstName', 'lastName', 'email', 'phoneNumber']);
      return jsonResponse({ res, data: application });
    }

    return jsonResponse({
      status: statusCodes.HTTP_NOT_FOUND,
      res,
      message: 'Job application not found.',
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async makeApplicationDecision(req, res) {
    const { status } = req.body;

    const jobApplication = await JobApplicationModel.findById(req.params.applicationId);

    if (jobApplication) {
      const job = await JobModel.findById(jobApplication.job);

      if (String(job.postedBy) === req.currentUserId) {
        jobApplication.status = status;
        await jobApplication.save();
        return jsonResponse({ res, data: jobApplication });
      }

      return jsonResponse({
        res,
        status: statusCodes.HTTP_FORBIDDEN,
        message: "Sorry, you don't have enough permissions to make job decision",
      });
    }

    return jsonResponse({ res, status: statusCodes.HTTP_NOT_FOUND, message: 'Target job application was not found.' });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async getJobApplicantDetails(req, res) {
    const { jobId, applicantId } = req.body;

    const application = await JobApplicationModel.find()
      .where({ job: jobId, applicant: applicantId })
      .populate('job')
      .populate('applicant')
      .exec();

    if (application) {
      return jsonResponse({ res, data: application });
    }
    return jsonResponse({
      status: statusCodes.HTTP_NOT_FOUND,
      message: 'No applicant details were found.',
    });
  }
}

export default JobApplication;
