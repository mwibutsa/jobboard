# JobBoard

Simple job application APIs
- [API URL](https://jobboar-api.herokuapp.com/api/v1)
## Description

Backend APIs for the simple job application system.

## Technologies

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ORM](https://mongoosejs.com/)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- A package manager - [Yarn](https://yarnpkg.com/lang/en/) (preferred) or [NPM](https://www.npmjs.com/)

## Prerequisites

NodeJS and a package manager should be installed on your system together with the following applications for use in development

- [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download/) for testing the API or to trigger API actions.

- A web browser prefer [Chrome](https://www.google.com/chrome/)

## Setup

After installing the prerequisites, clone the repository:

```ch
    git clone https://github.com/mwibutsa/jobboard.git
```

Then change the directory to the cloned repository:

```ch
    cd jobboard
```

To install dependencies defined in the `package.json` file run:

```ch
    yarn install
```

Create a `.env` file and add all variables as defined in the `.env.example` file

```ch
    touch .env
```

Start the local development for the micro-frontend app run

```ch
    yarn dev
```

To access the development version of Farmers Order APIs:

- Open [localhost:4000](http://localhost:4000/api/v1) in Postman

## API Documentation

### User

- `POST /api/v1/user/login`

  ```json

    {
        "email": "fmwibutsa@gmail.com",
        "password": "Password@1"
    }

  ```

- `POST /api/v1/user/sign-up`

  ```json

    {
        "email": "fmwibutsa@gmail.com",
        "password": "Password1",
        "firstName":"Mwibutsa",
        "lastName":"Floribert",
        "profilePicture":"File",
    }

  ```

### Job

- `GET /api/v1/jobs/all`

  ```json
    {
        "status": "200",
        "data":[
            {
            "_id":"62364cf17325a7d091c6c9f5",
                "title":"Job title",
                "description":"The $32 trillion commercial real estate industry is the last major asset class in the world that runs mainly on manual processes. Intelas is building a platform that automatically ingests, validates, and maps commercial real estate operating data to a uniform standard",
                "payRange":"$100,000 - $125,000 a year",
                "postedBy":"62364c2d7325a7d091c6c9f1"
            },
            {
            "_id":"62364cf17325a7d091c6c9f5",
                "title":"Job title",
                "description":"The $32 trillion commercial real estate industry is the last major asset class in the world that runs mainly on manual processes. Intelas is building a platform that automatically ingests, validates, and maps commercial real estate operating data to a uniform standard",
                "payRange":"$100,000 - $125,000 a year",
                "postedBy":"62364c2d7325a7d091c6c9f1"
            }

        ]
    }

  ```

- `POST /api/v1/jobs/new-job`

  ```json
        {
            "_id":"62364cf17325a7d091c6c9f5",
            "title":"Job title",
            "description":"The $32 trillion commercial real estate industry is the last major asset class in the world that runs mainly on manual processes. Intelas is building a platform that automatically ingests, validates, and maps commercial real estate operating data to a uniform standard",
            "payRange":"$100,000 - $125,000 a year",
            "postedBy":"62364c2d7325a7d091c6c9f1"
        }
  ```

### Job Applications

- `GET /api/v1/job-application/all`

  ```json
    {
        "status": "200",
        "data":[

            {
            "_id": "62364e127325a7d091c6ca01",
            "job": {
                "_id": "62364d1d7325a7d091c6c9f7",
                "title": "Senior Javascript software developer",
                "description": "EPAM is hiring Senior and Lead JavaScript Engineers with React or Angular experience, who are looking for a high-impact role with a global leader in digital transformation! As an EPAMer, you’ll have the opportunity to work with a supportive team, on a variety of interesting projects for some of the biggest brands in the world, develop new skills and gain certifications with the latest technologies, and advance your engineering career with a large, rapidly growing organization. Want to learn more? We'd love to chat! ",
                "payRange": "$100,000 - $125,000 a year",
                "postedBy": "62364c2d7325a7d091c6c9f1",
                "__v": 0
            },
            "cvFile": "http://res.cloudinary.com/mwibutsa/image/upload/v1647726097/tmp-2-1647726095071_hyy6za.pdf",
            "applicant": {
                "firstName": "Mwibutsa",
                "lastName": "Floribert",
                "phoneNumber": "+250787740316",
                "email": "fmwibutsa@gmail.com",
                "id": "62364c2d7325a7d091c6c9f1"
            },
            "status": "Pending",
            "__v": 0
             },

        ]
    }

  ```

- `POST /api/v1/job-application/apply-for-job/62364cf17325a7d091c6c9f5`

  ```json
        {
            "jobId":"62364cf17325a7d091c6c9f5",
        }
  ```

 - `PUT /api/v1/job-application/make-application-decision/62364cf17325a7d091c6c9f5`

  ```json
        {
            "status":"Passed",
        }
  ```

- `GET /api/v1/job-application/62364cf17325a7d091c6c9f5`

  ```json
    {
    "status": 200,
    "data": {
        "_id": "62371d118eacdfbda6271c39",
        "job": {
            "_id": "62364cf17325a7d091c6c9f5",
            "title": "Full Stack developer",
            "description": "The $32 trillion commercial real estate industry is the last major asset class in the world that runs mainly on manual processes.
             Intelas is building a platform that automatically ingests, validates"
        },
        "cvFile": "http://res.cloudinary.com/mwibutsa/image/upload/v1647779088/tmp-1-1647779086705_ryqozl.pdf",
        "applicant": {
            "firstName": "Mwibutsa",
            "lastName": "Floribert",
            "phoneNumber": "+250787740316",
            "email": "fmwibutsa@gmail.com",
            "id": "62364c2d7325a7d091c6c9f1"
        },
        "status": "Pending",
        "__v": 0
    }
    }
  ```

## Development standards and Guidelines

- [Commit message](https://www.conventionalcommits.org/en/v1.0.0/)
- [ESLint](https://eslint.org/) for Typescript and Javascript

## Deployment

- Raise a PR on `develop` branch
- Branch naming `<type>/short-description` where type can be [feat,bug,chore] or their [ft,bg,ch] respectively

## Maintainers

- [Mwibutsa Floribert](https://gitlab.com/mwibutsa)
