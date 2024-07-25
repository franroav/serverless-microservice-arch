
// DB MANAGEMENT cb_subscription as example
// use cb_subscription
db.createCollection("traces")
db.createCollection("subscriptions")
db.createCollection("users")
db.createCollection("articles");
db.users.insertMany([
{"email": "franroav@gmail.com", "password": "prueba1"},
{"email": "webkonce@gmail.com", "password": "$2b$10$uwkf/5wtKfpdBbxMSSePje5eL/owosUhCYHi6EJpU7TJ.DDb35wtO"}
])
db.articles.insertMany([
{
  created_at: new Date(),
  title: "Article 1",
  url: "http://example.com/article1",
  author: "Author 1",
  points: 10,
  story_text: "This is the story text of article 1.",
  comment_text: "This is a comment on article 1.",
  num_comments: 5,
  story_id: 1,
  story_title: "Story Title 1",
  story_url: "http://example.com/story1",
  parent_id: 0,
  created_at_i: Math.floor(new Date().getTime() / 1000)
},
{
  created_at: new Date(),
  title: "Article 2",
  url: "http://example.com/article2",
  author: "Author 2",
  points: 20,
  story_text: "This is the story text of article 2.",
  comment_text: "This is a comment on article 2.",
  num_comments: 10,
  story_id: 2,
  story_title: "Story Title 2",
  story_url: "http://example.com/story2",
  parent_id: 1,
  created_at_i: Math.floor(new Date().getTime() / 1000)
}
])
db.traces.insertMany([
  {email: "trace1@example.com",name: "Trace 1"},
  {email: "trace2@example.com",name: "Trace 2"}
])
db.subscriptions.insertMany([
  {
    name: "Subscription 1",
    invitation: 10,
    amount: 100,
    email: "sub1@example.com",
    address: "123 Main St",
    gender: "Male",
    code: "ABC123",
    traces: [
      {email: "trace1@example.com", name: "Trace 1"},
      {email: "trace2@example.com", name: "Trace 2"}
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Subscription 2",
    invitation: 20,
    amount: 200,
    email: "sub2@example.com",
    address: "456 Elm St",
    gender: "Female",
    code: "XYZ789",
    traces: [
      {email: "trace1@example.com", name: "Trace 1"}
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
])