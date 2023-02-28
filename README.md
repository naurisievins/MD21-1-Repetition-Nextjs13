# Next.js recipe application

To run locally:
`npm install`
`npm run dev`

To connect to MongoDB:

At utils/mongoConnect.ts change your connection credentials...
`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nrnk.zq3cas7.mongodb.net/recipes?retryWrites=true&w=majority`

add .env file to root directory:

```
DB_USERNAME=username
DB_PASSWORD=password
NEXT_PUBLIC_ACCESS_KEY=accessKey
```

where DB_USERNAME and DB_PASSWORD are your monogDB credentials and accessKey is required password for adding / edditing / deleting recipes.
