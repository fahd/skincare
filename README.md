## **findskin.care** is an application that allows for:

- Dynamic filtering of skincare and healthcare products based on either a combination of product brands and the categories/subcategories a product could be associated with (e.g. "anti-aging" or "bath & body" products), or either one exclusively.
- Shareable routines of what skincare products people use, and what routines they use them for.
- Community interaction around the vetting and espousal of skin and healthcare products (product comments, likes around products and user routines) in order to help people learn about new products, or where to purchase vetted products.

## Why?
I was frustrated with Ulta.com's loading delays in searching for products, and the number of menus and confusing layouts to look for a specific product depending on the brand. Certain brands have different layouts - some have page with three rows of carousels (which I didn't find conducive for searching), while others are simply lists of items. I wanted to speed up the search process while normalizing brands and products to a uniform, mobile-first style.

I also wanted a Reddit-style search process to get a more instantaneous sense of the community's pulse on a product. Typically, for products on Ulta there is a rating out of 5 stars when you view a product, but you do not know how many people have voted. 

On Ulta, you have to scroll down and read all the reviews - which I wanted users to already be informed of the number of people reviewing the product before they got to the reviews. I also wanted the rating to be binary (for now) and suggest people take a side in either endorsing a product or not, as opposed to the aggregation of rating a product 1-5 (which can be for many different reasons) being the first indicator of a product's worthiness. This is not to say 5 star rating systems are bad - I preferred an all-or-nothing system.

## State of the application

This application is live and hosted on Amazon EC2. The critical features have been implemented, mainly
- Custom filtering of products by product type, product brand, or both, sorted by most upvoted
- Rendering, normalization, and categorization of 10,000+ products scraped from Ulta.com, with over 30,000 product tags created.
- User login/signup, profile pages, settings pages, and page for managing/viewing their custom routines
- Product pages with detailed product info and comments sorted by "most helpful" 
- Adding custom, shareable routines to allow one to share her/his routines and products used for that routine
  - for an example of this, see (https://findskin.care/user/aubreyplaza/lists/1/my-morning-routine)

## Next Steps
The next steps in development are
- implementing a more robust search across all products and brands when a user is searching for a particular product. 
- more editable functionality for comments and routine pages
- more granular reviews in comments on product page, for e.g. 1-5-star reviews
- community suggestions/additions for existing products, and adding new products/brands.
- users viewing all their data in one place (products liked, comments created, comments liked, users following, routines liked)
- addition of more categories/subcategories for more accurate labeling of products and brands.
- Include testing.

## Stack Used
I leveraged React.js, Node.js and Express.js, and GraphQL with Apollo for client side requests to create my API, that is in sync with PostgreSQL. You can see this code in `/server`. The queries I have written are without the assistance of an ORM like Sequelize.

For scraping, I used Cheerio.js to scrape 10,000+ pages from Ulta.com.

You can see my logic, and brand/product csvs, under the `_assets` directory.

## Points of Interest

I really enjoyed figuring out a way to seed my database with products. I had to rate-limit my requests from Ulta.com in order to first get all the brands and their urls (over 600), all the product urls for each brand (over 12,000), and then all of the product data from each product url, all while automated. This proved to be much easier when I used Cheerio.js to automate scraping and populating of each product page into a CSV file, which I used to populate my database. There is a question of ethics as well as I have scraped products from Ulta.com directly, but I am not seeking to make any money off of this application and any extra traffic is directed right back to the original product url which may benefit them. 

Creating the filtering logic was very rewarding. I had to create logic to not overwhelm the user with options with the UI while also providing the option for granular feedback and allowing users to filter by brand, by product type, or by both. I accomplished this with a broad array of categories, along with nested categories (e.g. "hair -> hair color" for category and subcategory) for more granularity, while constructing a custom PostgreSQL query to account for the many options betweens filters and brands, which you can see in `server/models/methods/getProductsByFilter.js`.

Lastly, I also enjoyed my code organization and best practices. Every component is distinctly labelled, and using Styled components helped make the client html easy to parse per each component, and for shared components. My server code is also divided by models, resolvers, schema, utilities, and database logic, so that a potential team could easily navigate between the different separations of concerns.

## Points of Disinterest

PostgreSQL queries can be optimized in order to create better searches and reduce database query times. For now, the queries that I need serve my application's purpose, but will have to be improve over time, especially as more functionality is implemented.

In addition, the tagging of 10k+ products is not perfect. I use contextual information from the product page to generate product tags, and for instance some details (e.g. "Fragrance Free") might tag a product as being a fragrance product. This is partly mitigated by having a community (which I do not yet) to help flag and correct inaccurate tags. At the moment, automating the tagging of this number of products has been fruitful so far, and I'm looking for better ways to tag and categorize these products.

This project took me around six weeks from start to end, from figuring out how to scrape data to implementing a full-stack application with authentication functionality. The planning phase was about a week, and although I was itching to start developing, it was necessary to deliberately plan so I could wireframe all the different views and user flows, which in the end actually ended up saving me development time.

## Conclusion

Overall, this project was a lot of fun to make. If you have any questions, feel free to reach out to me at fahdnsheikh@proton.me!
