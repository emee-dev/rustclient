// Prototype for the collection format for this http client

/**
 * Collection folder -> "collection"
 * file formats -> [".toml", ".bru", ".json"]
 *
 * Top level config file -> "aspn.json"
 *
 * Individual file schema -> ".toml"
 *
 */

/**
 * file_name= "get all users"
 *
 * [file]
 * name= "get all users"
 * type= "http"
 * sequence= 1
 *
 * [meta]
 * url= "https://echo.free.beeceptor.com"
 * body= "none" // value is dynamic depending on the provided type of the body section
 * auth= "none"
 * method= "post"
 *
 * [headers]
 * Accept= "application/json"
 * Content-Type= "application/json"
 *
 * [body.json]
 * content= """
 *    {
 *      "name": "emee"
 *    }
 * """
 *
 * [body.xml]
 * content= """
 *    {
 *      "name": "emee"
 *    }
 * """
 *
 * [body.text]
 * content= """
 *    {
 *      "name": "emee"
 *    }
 * """
 *
 * [body.multipart-form]
 * content= """
 *    {
 *      "avatar": "@file(C:\Users\DELL\Pictures\A.png)"
 *      "username": "emee"
 *    }
 * """
 *
 * [body.form-urlencoded]
 * username= "emee"
 *
 * [script.before-request]
 * content= """
 *      console.log(res.body.name);
 * """
 *
 * [script.after-response]
 * content= """
 *      console.log(res.body.name);
 * """
 *
 * [docs]
 * content= """
 *      Hello this is a sample documentation preview page..
 *      **Bold** text for a markdown documentation page
 *  """
 */

// Invalid escape sequence

// 1. @file(C:\Users\DELL\Pictures\A.png)
// Fix
// @file(C:\\\\Users\\\\DELL\\\\Pictures\\\\A.png)
