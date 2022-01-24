## Getting Started

This repo represents an Image processing API, which its main purpose and functionality is to resize images to certain width and height ,loading them to the browser, and caching it to another folder in the disk.

## Libraries & Technologies used

- **Express**
was used as a basic web framework to build up and set server, routes, and requests.

- **Sharp**
was used to resize images after asynchronously reaching the endpoint.

- **Filesystem**
was used to control the files within both *images* and *image-resized*.
 
- **Jasmine**
was used to apply tests on functions and endpoints.

- **Supertest**
was used to be able to test endpoints integrated with *jasmine*.