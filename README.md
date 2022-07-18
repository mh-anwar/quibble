# Recess Hacks Submission 2022 by @mh-anwar and @r-chong

## Inspiration

As long-time online buyers, @mh-anwar and I have tried every consumer-to-consumer platform in Canada. One thing that we constantly noted was the lack of a way to contact sellers to dispute the price, which led us to create Quibble, the price negotiation app.

## What it does

Quibble is a platform that connects online buyers to online sellers. Buyers can range from people who enjoy the art of haggling, to money-conscious individuals. Sellers who are adept in negotiation are now able to use this skill in their e-commerce businesses. One thing that we made sure to include was the fact that, sometimes sellers don't know how much something in their garage is worth. This is where Quibble comes in: to allow the buyer and seller to reach a mutual deal.

# Full-stack Hackathon Project by @mh-anwar and @r-chong

## How we built it

We built Quibble using React.js, Express.js, Material UI, and using Node.js for the backend of the website, and of course vanilla JavaScript, HTML, and CSS. We did not use a SQL/non-SQL database (such as MongoDB, etc) as this was just a concept design.

## Challenges we ran into / What we learned

The most important thing that we learned was to work on the backend first and frontend second. This allows for the frontend to be built based on the API and not the other way around. One challenge we ran into was the ambitious integration of a chat API (ie. Google Chat, Messenger) to allow live contact between buyers and sellers. As aspiring beginners, it was quite a humbling experience that reminded us that we still have a long way to go in our programming journey. Lastly, we were only able to get a partially working Heroku deployment up and running in for the competition, due to both our lack experience with Heroku and lack of time and so one of our next steps would be to deploy fully.

## What's next for Quibble

The next step for Quibble would be to scale. In order to support hundreds, thousands if not millions of users, the project will need to use a database such as MongoDB. Furthermore we would need to iron out various bugs and to do a more in-depth dive into APIs in order to improve the negotiation experience between buyer and seller.

---

# How to run

### Pre-requisites

- Node.js version 16+
- NPM version 6+ (comes with node.js)

This project does not have a website yet, to test locally:

- git clone https://github.com/mh-anwar/quibble.git repo-name
  or with SSH
- git clone git@github.com:mh-anwar/quibble.git repo-name

To launch the frontend:

```
cd ./app
npm install
npm start
```

Then to launch the backend

```
cd ./server
npm install
npm start
```
