const template = {
  start: `
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title># pages list</title>
       <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
     </head>
     <body>
     <style>
       .pages {
         padding: 50px 30px;
         font-size: 20px;
         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
         color: #000;
       }
       .pages__list {
         list-style: circle;
       }
       .pages__item {
         text-transform: uppercase;
         margin-bottom: 0.8em;
       }
       .pages__link {
         text-decoration: none;
         transition: opacity .3s;
       }
       .pages__link:hover {
         text-decoration: underline;
         opacity: 0.8;
       }
       .pages__link {
         color: #000;
       }
       .pages__link:visited {
         color: #000;
       }
       
     </style>

       <main class="pages">
         <ul class="pages__list">
   `,
           // pages list will be here, generated in pages.js gulp task
   end: `
          </ul>
        </main>
      </body>
    </html>`
}

module.exports = template