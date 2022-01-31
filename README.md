# Socialize: Simple social web app using React and .NET Core 5

A real time social network built with React, Redux and ASP.NET(C#).

it contains a user authentication system, activity management including real time chat, user profile management including following/followers, photo cropper and upload.


## API Roadmap

- [x] POST; User login.
- [x] POST; User registration.
- [x] GET; Returns a paged set of Activities.
- [x] GET; Returns a an activity by Id.
- [x] GET; Returns a user with the simple info.
- [x] GET; Returns a user with details and photos.
- [x] PUT; Updates current user thumbnail.
- [x] POST; Creates an activity.
- [x] PUT; Updates an activity.
- [x] POST; Attends an activity.
- [x] POST; Un-Attends an activity.
- [x] POST; Cancels an activity.
- [x] DELETE; Deletes an activity.
- [x] POST; Generate S3 presigned URL.
- [x] DELETE; Deletes S3 file.
- [ ] Support comments and real time communication with SignalR.
- [ ] Support Refresh tokens.
- [ ] Handle concurrency problems.
- [ ] Implement followers / following feature.
- [ ] Paging, sorting and filtering.
- [ ] Update to latest .NET version (.NET 6)
- [ ] Support SendGrid to send emails, for scenarios like "Forgot your password?"

## UI Roadmap

- [x] Support Redux and solving props-drilling issue.
- [x] Support Profile picture upload to S3 after retreiving presigned url from the server.
- [x] Using react-cropper for cropping the a picture before upload.
- [ ] Support comments and real time communication.
- [ ] Implement followers / following feature.
- [ ] Facebook login using OAuth.
