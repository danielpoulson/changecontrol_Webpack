### Road Map

// TODO: (3) HIGH Fix mongoose promises

Server fixes - Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

//TODO: (2) MED File downloading is not working in development due to proxy mode

Issues / bugs


// TODO: (3) LOW Pagination is mutating a child element
// warning.js:36 Warning: Component's children should not be mutated.
//     in li (created by Pagination)
//     in ul (created by Pagination)
//     in nav (created by Pagination)
//     in Pagination (created by Changes)
//     in div (created by Changes)
//     in div (created by Changes)
//     in section (created by Changes)
//     in Changes (created by Connect(Changes))
//     in Connect(Changes) (created by RouterContext)
//     in div (created by App)
//     in div (created by App)
//     in App (created by Connect(App))
//     in Connect(App) (created by RouterContext)
//     in RouterContext (created by Router)
//     in Router
//     in Provider

//TODO: (4) MED When updating the status of a change the icon for that change is not reloaded.
// The icon is reloaded if any changes is made at the same time

//TODO: (4) MED When updating the status of a task the icon turns to a purple box.
// The icon is reloaded once the change is reloaded
