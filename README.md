
# 2022 Recess Hacks Submission by [mh-anwar](https://github.com/mh-anwar) and [r-chong](https://github.com/r-chong)

## [Quibble Marketplace](https://quibble.anwar.app)
![Quibble_Marketplace](https://user-images.githubusercontent.com/75395781/205465497-a0ead43c-0bf8-4568-acf4-38f5bd7228cd.png)

- [2022 Recess Hacks Submission by mh-anwar and r-chong](#2022-recess-hacks-submission-by-mh-anwar-and-r-chong)
  - [Quibble Marketplace](#quibble-marketplace)
  - [Heroku to Deta Port](#heroku-to-deta-port)
  - [Inspiration](#inspiration)
  - [What it does](#what-it-does)
- [Full-Stack App Technical Details](#full-stack-app-technical-details)
  - [How We Built It](#how-we-built-it)
  - [Challenges We Ran Into / What We Learned](#challenges-we-ran-into--what-we-learned)
  - [What's Next for Quibble](#whats-next-for-quibble)
- [How to Launch Quibble](#how-to-launch-quibble)
    - [Pre-requisites](#pre-requisites)

## Heroku to Deta Port
After Heroku changed it's pricing plan, this project was ported to Deta in order to keep the proof of concept alive.
## Inspiration

As long-time online buyers, @mh-anwar and @r-chong have tried every consumer-to-consumer platform in Canada. One thing that they constantly noted was the lack of a way to contact sellers to trade, which led them to create Quibble, the trading app.

## What it does

Quibble is a platform that connects online buyers to online sellers. Buyers can range from people who enjoy the art of haggling, to money-conscious individuals. Sellers who are adept in negotiation are now able to use this skill in their e-commerce businesses. One thing that we made sure to work on was the fact that, sometimes sellers don't know how much something in their garage is worth. This is where Quibble comes in: to allow the buyer and seller to reach a mutual deal.

# Full-Stack App Technical Details

## How We Built It

We built Quibble using React.js and Material UI for the frontend and Node.js as well as Express.js for the backend. Of course this meant that we also used vanilla JavaScript, HTML, and CSS. We did not use a SQL/non-SQL database (such as MongoDB, etc) as this was just a concept design.

## Challenges We Ran Into / What We Learned

The most important thing that we learned was to work on the backend first and frontend second. This allows for the frontend to be built based on the API and not the other way around (which causes issues). One challenge we ran into was the ambitious integration of a chat API (ie. Google Chat, Messenger) to allow live contact between buyers and sellers, unfortunately we were unable to integrate it in time and instead implemented a "Contact Quibber" feature. As aspiring beginners, it was quite a humbling experience that reminded us that we still have a long way to go in our programming journey. Lastly, we were only able to get a partially working Heroku deployment up and running in for the competition, due to both our lack experience with Heroku and lack of time and so one of our next steps would be to deploy fully.

## What's Next for Quibble

The next step for Quibble would be to scale. In order to support hundreds, thousands if not millions of users, the project will need to use a database such as MongoDB. Furthermore, we would need to iron out various bugs and to do a more in-depth dive into APIs in order to improve the negotiation experience between buyer and seller. We would implement a fully functional chat, secure login and encrypted database in order to make Quibble scale.

---

# How to Launch Quibble

### Pre-requisites

- Node.js version 16+
- NPM version 8+ (comes with node.js)

In order to test locally:

```
git clone https://github.com/mh-anwar/quibble.git <folder-name>
```

or with SSH

```
git clone git@github.com:mh-anwar/quibble.git <folder-name>
```

To launch the frontend:

```
cd ./app
npm install
npm run start
```

If you want to modify the backend you will have to set up a Deta Space.
