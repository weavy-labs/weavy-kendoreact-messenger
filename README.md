# Weavy KendoReact Chat
This project shows you how you can use the KendoReact UI components together with the Weavy Chat API to build a complete, ready-to-use chat - either in you app, or stand-alone.

Weavy Chat API is completely free; unlimited MAU, users, messages, storage. No cap. You can find out [what is included here](https://www.weavy.com/pricing).

You want to see whare you're about to build? Go to the [KendoReact Chat Demo](https://weavykendochat.weavycloud.com/).

## Getting started with Weavy KendoReact Chat
Just clone the repo and you should be up and running in no time. Everything is prepared with a demo instance up and running so you can start playing around with it instantly.

### Scripts
In the project directory, you can run:

#### `yarn`
Installs all the packages.

#### `yarn start`
Runs the app in the development mode.  
Open  [http://localhost:3000](http://localhost:3000/)  to view it in the browser.

The page will reload if you make edits.

#### `yarn build`
Builds the app for production to the  `build`  folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

## Weavy Chat API demo instance
The Weavy Chat API demo instance is setup at [https://showcase.weavycloud.com](https://showcase.weavycloud.com). This instance is **only** for demo and testing purposes and should never be used in a production environment. The demo instance is cleaned and reset every now and then.

You are free to use the demo instance when you test and evaluate the **Weavy KendoReact Chat** for as long as you want. When you are ready try the Weavy Chat API in your app and with your users [sign up](https://www.weavy.com/account/signup) to get your license.

## Authentication
For demo purposes, we've created four predefined users you can sign in with. When you start the app you will be presented by a Sign In screen. 

If you would like to automatically sign in with one of the pre-defined users, update the following files;
- In `constant.js` change `DEMO` to `false`
- In `app.js` add one of the four tokens below in the `generateToken()` function

- Oliver `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbGl2ZXIiLCJuYW1lIjoiT2xpdmVyIFdpbnRlciIsImV4cCI6MjUxNjIzOTAyMiwiaXNzIjoic3RhdGljLWZvci1kZW1vIiwiY2xpZW50X2lkIjoiV2VhdnlEZW1vIiwiZGlyIjoiY2hhdC1kZW1vLWRpciIsImVtYWlsIjoib2xpdmVyLndpbnRlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoib2xpdmVyIn0.VuF_YzdhzSr5-tordh0QZbLmkrkL6GYkWfMtUqdQ9FM`
- Lilly `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsaWxseSIsIm5hbWUiOiJMaWxseSBEaWF6IiwiZXhwIjoyNTE2MjM5MDIyLCJpc3MiOiJzdGF0aWMtZm9yLWRlbW8iLCJjbGllbnRfaWQiOiJXZWF2eURlbW8iLCJkaXIiOiJjaGF0LWRlbW8tZGlyIiwiZW1haWwiOiJsaWxseS5kaWF6QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJsaWxseSJ9.rQvgplTyCAfJYYYPKxVgPX0JTswls9GZppUwYMxRMY0`
- Samara `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW1hcmEiLCJuYW1lIjoiU2FtYXJhIEthdXIiLCJleHAiOjI1MTYyMzkwMjIsImlzcyI6InN0YXRpYy1mb3ItZGVtbyIsImNsaWVudF9pZCI6IldlYXZ5RGVtbyIsImRpciI6ImNoYXQtZGVtby1kaXIiLCJlbWFpbCI6InNhbWFyYS5rYXVyQGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJzYW1hcmEifQ.UKLmVTsyN779VY9JLTLvpVDLc32Coem_0evAkzG47kM`
- Adam `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGFtIiwibmFtZSI6IkFkYW0gTWVyY2VyIiwiZXhwIjoyNTE2MjM5MDIyLCJpc3MiOiJzdGF0aWMtZm9yLWRlbW8iLCJjbGllbnRfaWQiOiJXZWF2eURlbW8iLCJkaXIiOiJjaGF0LWRlbW8tZGlyIiwiZW1haWwiOiJhZGFtLm1lcmNlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiYWRhbSJ9.c4P-jeQko3F_-N4Ou0JQQREePQ602tNDhO1wYKBhjX8`

By doing this you can automatically sign in with different users for demo purposes, for example, if you decide to repurpose this code to work within your existing app, etc.

> NOTE: This is **only** for demonstration purposes and lets you easily play around with the Chat API.

## Moving past the demo instance
If you want to get up and running with your own Weavy Chat API; [sign up](https://www.weavy.com/account/signup) and follow the instuctions to set up your own backend.

Once you have your own backend up and running you need to update two files in this repo:

- `constants.js` - update `API_URL` so it points to your backend, and set `DEMO` to `false`
- `app.js` - add your own endpoint (your backend or OAuth) in `generateToken()` - for information about JWT Tokens and Weavy, follow the instructions here; [Weavy JWT tokens](https://www.weavy.com/docs/client/authentication).

## Weavy 
Weavy is <u>the</u> in-app  collaboration SDK & API that enables your users to engage each other to make faster, better decisions through contextual collaboration using in-app chat, activity feeds, secure file sharing, and more.

Weavy allows developers to quickly add collaboration features to any app without the tedious groundwork.

Whether you use our Client SDK with the Drop-in UI, or our Server SDK to completely customize every aspect of Weavy - **it's all designed for maximum impact with minimum effort.**

For more information about Weavy, head over to https://weavy.com.

## KendoReact
KenoReact by Progress is the only React component library you need. KendoReact is a professional UI kit on a mission to help you  design & build business apps with React much faster.
For more information, head over to the [KendoReact documentation](https://www.telerik.com/kendo-react-ui/).
