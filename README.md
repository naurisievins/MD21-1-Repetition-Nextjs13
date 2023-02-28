# Next.js recipe application

### This is my first Next.js application.

- Application hosted on Vercel
- MongoDB hosted on Atlas

#### Main features:

- responsive design
- sort by category or search by name
- simple authorization check for adding / editing / deleting recipes
- debounced search
- success and error toasts
- form validation

#### Packages I used:

- Axios for data fetching
- Mongoose for mongoDB
- Dotenv for storing sensitive data
- React-toastify for toasts
- Nod for form validation
- Uuid for id generation

#### To run locally:

`npm install`
`npm run dev`

To connect to MongoDB:

At utils/mongoConnect.ts change your connection credentials.

```
mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nrnk.zq3cas7.mongodb.net/recipes?retryWrites=true&w=majority
```

add .env file to root directory:

```
DB_USERNAME=username
DB_PASSWORD=password
NEXT_PUBLIC_ACCESS_KEY=accessKey
```

where DB_USERNAME and DB_PASSWORD are your monogDB credentials and accessKey is required password for adding / edditing / deleting recipes.
