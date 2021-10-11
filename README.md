# Weavy KendoReact Chat
This project shows you how you can use the Kendo React UI components together with Weavy to build a complete, ready-to-use chat.


## Getting started with Weavy KendoReact Chat
Just clone the repo and you should be up and running in no time. We have prepared a Weavy demo instance that you can use when  testing the chat. 

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

### Weavy 
Some text about Weavy...

### KendoReact
KenoReact by Progress is the only React component library you need. KendoReact is a professional UI kit on a mission to help you  design & build business apps with React much faster.
For more information, head over to the [KendoReact documentation](https://www.telerik.com/kendo-react-ui/).

### Weavy demo instance
The Weavy demo instance is setup at [https://showcase.weavycloud.com](https://showcase.weavycloud.com). This instance is **only** for demo and testing purposes and should never be used in a production environment. The demo instance is cleaned and reset every now and then.
You are free to use the demo instance when you test and evaluate the **Weavy KendoReact Chat** for as long as you want. When you are ready to go live with the chat app, you should setup a new instance of Weavy as described below.

### Authentication
Authentication should be handled by the host application and user identity and profile information is passed on to Weavy with JSON Web Tokens (JWT). A [Weavy Authentication Client](https://docs.weavy.com/server/rest/authentication) must be created in the Weavy instance and the token you create must include a claim that references that authentication client.

For more details how to create the JWT, please take a look at the documentation for [Weavy JWT tokens](docs.weavy.com/client/authentication#creating-the-json-web-token).

*More info how to pass on the token in the Chat app....*

### Setup a Weavy instance
Ready to go live? Great! Head over to the [Weavy Getting Started](https://docs.weavy.com/server/get-started) to lean everything you need how to setup your own instance of Weavy.
The setup process is basically: 
1. Clone the Weavy solution repo
2. Create a database
3. Build and test run.
4. Publish the solution
5. Create a Weavy Authentication Client
6. Use the Weavy Authentication Client info when you create the user's JWTs.





