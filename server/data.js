const moment = require("moment");
const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const meetup1Id = mongoose.Types.ObjectId();
const meetup2Id = mongoose.Types.ObjectId();
const meetup3Id = mongoose.Types.ObjectId();
const meetup4Id = mongoose.Types.ObjectId();
const meetup5Id = mongoose.Types.ObjectId();
const meetup6Id = mongoose.Types.ObjectId();

const thread1Id = mongoose.Types.ObjectId();
const thread2Id = mongoose.Types.ObjectId();
const thread3Id = mongoose.Types.ObjectId();
const thread4Id = mongoose.Types.ObjectId();
const thread5Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post2Id = mongoose.Types.ObjectId();
const post3Id = mongoose.Types.ObjectId();
const post4Id = mongoose.Types.ObjectId();
const post5Id = mongoose.Types.ObjectId();
const post6Id = mongoose.Types.ObjectId();
const post7Id = mongoose.Types.ObjectId();
const post8Id = mongoose.Types.ObjectId();
const post9Id = mongoose.Types.ObjectId();
const post10Id = mongoose.Types.ObjectId();
const post11Id = mongoose.Types.ObjectId();
const post12Id = mongoose.Types.ObjectId();

const category1Id = mongoose.Types.ObjectId();
const category2Id = mongoose.Types.ObjectId();
const category3Id = mongoose.Types.ObjectId();
const category4Id = mongoose.Types.ObjectId();
const category5Id = mongoose.Types.ObjectId();
const category6Id = mongoose.Types.ObjectId();

module.exports = {
  meetups: [
    {
      _id: meetup1Id,
      location: "Mumbai, IN",
      processedLocation: "mumbaiin",
      title: "Night in the City",
      image:
        "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
      description:
        "Nightlife is a collective term for entertainment that is available and generally more popular from the late evening into the early hours of the morning.It includes pubs, bars, nightclubs, parties, live music, concerts, cabarets, theatre, cinemas, and shows.",
      shortInfo: "Let's go out!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(2, "days")
        .toISOString(),
      timeFrom: "14:00",
      timeTo: "18:00",
      joinedPeopleCount: 1,
      status: "active",
      category: category1Id,
      joinedPeople: [user2Id],
      meetupCreator: user1Id
    },
    {
      _id: meetup2Id,
      location: "Noida, IN",
      processedLocation: "noidain",
      title: "Dhoom Screening",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description:
        "A film screening is the displaying of a motion picture or film, generally referring to a special showing as part of a film's production and release cycle. To show the film to best advantage, special screenings may take place in plush, low seat-count theaters with very high quality (sometimes especially certified) projection and sound equipment, and can be accompanied by food and drink and spoken remarks by producers, writers, or actors.",
      shortInfo: "Batman premiere tomorrow!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(7, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 1,
      status: "active",
      category: category2Id,
      joinedPeople: [user3Id],
      meetupCreator: user2Id
    },
    {
      _id: meetup3Id,
      location: "Delhi, IN",
      processedLocation: "delhiin",
      title: "Cycling in Delhi",
      image:
        "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80",
      description:
        'Cycling, also called bicycling or biking, is the use of bicycles for transport, recreation, exercise or sport.People engaged in cycling are referred to as "cyclists", "bicyclists", or "bikers".Apart from two-wheeled bicycles, "cycling" also includes the riding of unicycles, tricycles, quadracycles, recumbent and similar human-powered vehicles (HPVs).',
      shortInfo: "Very nice trip in Delhi",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(7, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category1Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id
    },
    {
      _id: meetup4Id,
      location: "Goa, IN",
      processedLocation: "goain",
      title: "Snorkeling",
      image:
        "https://images.unsplash.com/photo-1512136146408-dab5f2ba8ebb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      description:
        "Snorkeling (British and Commonwealth English spelling: snorkelling) is the practice of swimming on or through a body of water while equipped with a diving mask, a shaped breathing tube called a snorkel, and usually swimfins.",
      shortInfo: "Let's go watch new Aquaman",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(7, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category1Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id
    },
    {
      _id: meetup5Id,
      location: "Chennai, IN",
      processedLocation: "chennaiin",
      title: "Smoothie Festival",
      image:
        "https://images.unsplash.com/photo-1588673523898-687eaf18c036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=423&q=80",
      description:
        "A smoothie is a drink made from pureed raw fruit and/or vegetables, typically using a blender.A smoothie often has a liquid base such as water, fruit juice, plant milk, and sometimes dairy products, such as (milk, yogurt, ice cream or cottage cheese). Smoothies may be made using other ingredients, such as crushed ice, sweeteners, vinegar, (honey or sugar), whey powder, chocolate or nutritional supplements, among others by personal choice.",
      shortInfo: "Smoothie Festival in the Town!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(7, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category6Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id
    },
    {
      _id: meetup6Id,
      location: "Mumbai, IN",
      processedLocation: "mumbaiin",
      title: "Mumbai Marathon",
      image:
        "https://images.unsplash.com/photo-1513276193780-64b881470da8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      description:
        "The Mumbai Marathon, is an annual international marathon held in Mumbai, India, on the third Sunday of January every year. It is the largest marathon in Asia as well as the largest mass participation sporting event on the continent. It is the richest race in India with a prize pool of US$405,000.",
      shortInfo: "Little bit of exercise!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      startDate: moment()
        .add(7, "days")
        .toISOString(),
      timeFrom: "08:00",
      timeTo: "10:00",
      joinedPeopleCount: 2,
      status: "active",
      category: category1Id,
      joinedPeople: [user1Id, user3Id],
      meetupCreator: user2Id
    }
  ],
  users: [
    {
      _id: user1Id,
      avatar:
        "https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg",
      email: "gaurav@gmail.com",
      name: "Gaurav Balyan",
      info: "Information about Gaurav Balyan",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      username: "gBalyan",
      password: "test",
      active: true,
      joinedMeetups: [meetup3Id, meetup4Id, meetup5Id, meetup6Id]
    },
    {
      _id: user2Id,
      avatar:
        "https://www.clipartmax.com/png/middle/195-1956720_%5B-img%5D-avatar.png",
      email: "shanu@gmail.com",
      name: "Shubhakshi Goyal",
      info: "Information about Shubhakshi Goyal",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      username: "sGoyal",
      password: "test",
      active: true,
      joinedMeetups: [meetup1Id]
    },
    {
      _id: user3Id,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqyc3j2s3bL4DIkC8uC9h0rcAdsDXcwJPNh8XHWbLQfHbOpVU",
      email: "madhav@gmail.com",
      name: "Madhav Goel",
      info: "I have a famous name",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      username: "mGoyal",
      password: "test",
      active: true,
      joinedMeetups: [meetup2Id, meetup3Id, meetup4Id, meetup5Id, meetup6Id]
    }
  ],
  threads: [
    {
      _id: thread1Id,
      title: "Should I take some food?",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup1Id,
      user: user1Id,
      posts: [post1Id, post2Id]
    },
    {
      _id: thread2Id,
      title: "I dont know what to think about this.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup2Id,
      user: user2Id,
      posts: [post3Id, post4Id]
    },
    {
      _id: thread3Id,
      title: "Here should be something",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup2Id,
      user: user2Id,
      posts: [post5Id, post8Id, post9Id]
    },
    {
      _id: thread4Id,
      title: "Some Very nice Thread!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup3Id,
      user: user3Id,
      posts: [post6Id, post7Id]
    },
    {
      _id: thread5Id,
      title: "Today is very nice weather let's go out!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      meetup: meetup6Id,
      user: user2Id,
      posts: [post10Id, post11Id, post12Id]
    }
  ],
  posts: [
    {
      _id: post1Id,
      text: "I will be late",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread1Id,
      user: user1Id
    },
    {
      _id: post2Id,
      text: "I like turtles",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread1Id,
      user: user1Id
    },
    {
      _id: post3Id,
      text: "I will be late",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread2Id,
      user: user2Id
    },
    {
      _id: post4Id,
      text: "I like turtles",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread2Id,
      user: user2Id
    },
    {
      _id: post5Id,
      text: "I like writing about nothing",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread3Id,
      user: user2Id
    },
    {
      _id: post6Id,
      text: "Very nice meetup, isn't it ?",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread4Id,
      user: user2Id
    },
    {
      _id: post7Id,
      text: "Yea it is.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread4Id,
      user: user1Id
    },
    {
      _id: post8Id,
      text: "I am not sure what to write.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread3Id,
      user: user1Id
    },
    {
      _id: post9Id,
      text: "hmm i don't know.",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread5Id,
      user: user2Id
    },
    {
      _id: post10Id,
      text: "Let's go running!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread5Id,
      user: user2Id
    },
    {
      _id: post11Id,
      text: "Really Today?",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread5Id,
      user: user2Id
    },
    {
      _id: post12Id,
      text: "Yea for sure!",
      createdAt: moment().toISOString(),
      updatedAt: moment().toISOString(),
      thread: thread5Id,
      user: user3Id
    }
  ],
  categories: [
    {
      _id: category1Id,
      name: "sport",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1167&q=80"
    },
    {
      _id: category2Id,
      name: "cinema",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      image2:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      image3:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
    {
      _id: category3Id,
      name: "music",
      image:
        "https://images.unsplash.com/photo-1569634311433-afb9edb8a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      _id: category4Id,
      name: "dance",
      image:
        "https://images.unsplash.com/photo-1509670811615-bb8b07cb3caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80"
    },
    {
      _id: category5Id,
      name: "party",
      image:
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    },
    {
      _id: mongoose.Types.ObjectId(),
      name: "literature",
      image:
        "https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    },
    {
      _id: category6Id,
      name: "food",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    },
    {
      _id: mongoose.Types.ObjectId(),
      name: "games",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    }
  ]
};
