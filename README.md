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


## Accessing the application
- Entry point to the application [Image Processing API](http://localhost:3000/)
- To access the application go throw this example link >>> [Image Processing API](http://localhost:3000/api/images?filename=fjord&width=200&height=200).



## Changes made

- *package.json:* prettier running script changed to be correctly configured so it runs properly. Also *supertest* was sent to devDependencies.

- *routes/image.ts:* adding type of **any** to the return of the *GET* route callback function. I was forced to do so because the return of *validationResult* would restrict me for setting the type as **exress.Response** as i intended.

- *tests/indeSpec.ts:* adding a test block for testing the image resizing operation in addition to some other tests for multiple endpoint requests.

- *utils/imagesUtils/handleGET.ts:* adding return type for each function, with changing some parts of the *resizeImage* function body to fit being tested on. Also, i was forced again to set the return type of such as async function as **Promise<any>** due to HUGE complications i faced when i tried to return multiple numbers, array of numbers, object of numbers or even **Promise<Metadata>**. TypeScript is such a big restriction ahead of me for this case.

- *utils/imagesUtils/checkValidation.ts* this is where i put my validation function which check on missing query values or existent files and then imported the whole file to be used as a middlware.

- *README.md:* lastly, i added those quick notes to this file to make your job as easy as possible to surf, notice and review my new code changes.