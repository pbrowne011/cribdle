# Cribdle

A cribbage game based off of Wordle

### Setting up venv

When activating the Python virtual environment, use the following command:
```
$ . venv/bin/activate
```
to setup the proper dependencies.

To deactivate the virtual environment, run
```
$ deactivate
```

### Running Flask application

To run the flask app, navigate to the `app` directory. Then run:
```
$ flask run
```
Because `app.py` is one of the default apps supported, this should work fine on
the first try.

### Desired gameplay

I have finally settled on a solution for the gameplay. The mimimum game that I
will first build captures the discard phase. There are $\binom{6}{2} = 15$
possible discards every hand. The goal is to find the one that maximizes your
expected value, i.e. gives you the most points on average.

After building this, I will construct two levels: easy (where you get feedback
if one of your cards is correct), and hard (where you get no feedback at all).
This is important, as this game is significantly different from Wordle in that
you are selecting combinations, not permutations, and thus any information given
away makes the game significantly easier.

After this, I will add a second game (or phase of the game, TBD) where you
imagine that you are giving cards to your opponent's crib. You want to make a
discard that again maximizes the expected value of your hand, but that also
minimizes the value of your opponent's hand. I'm not sure how closely these
will align, but it would be a cool feature to build.

### TODO

**Note 04-06-2024**: I am updating this to focus on learning enough JS, CSS, and
HTML to get by. Once I do this, it will make building the Flask app much easier.
For JS projects, see
[this link](https://www.freecodecamp.org/news/javascript-projects-for-beginners/)

- [ ] Watch [course](https://www.youtube.com/watch?v=PkZNo7MFNFg)
- [ ] Build a color flipper
- [ ] Build a counter
- [ ] Build a review carousel
- [ ] Build a grocery list
- [ ] Build Lorem ipsum
- [ ] Build Doodle jump

---
- [ ] Change gameplay to discard style
- [x] Calculate expected value of a hand based on cards left in the deck
- [ ] Build a simple Flask website to understand structure of app.py and routing
- [ ] Build Flask website to display six playing cards
- [ ] Build site where you can drag a playing card around
- [ ] Build site where you guess a random number and check against the solution
- [ ] Build site with bare-bones game logic (6 guesses, select cards, check if
correct or incorrect)
- [ ] Add easy and hard modes to (show correct guess) and (show nothing)
- [ ] Use Vue.js to design the app (many subtasks here)

### Resources for Flask and Vue.js

- [Flask quickstart](https://flask.palletsprojects.com/en/3.0.x/quickstart/),
provides basic details on how to setup and use Flask
- [flask-examples](https://github.com/helloflask/flask-examples/tree/master), a
repository on GitHub with several examples of simple Flask apps; see also the
parent resource [helloflask](https://helloflask.com/en/)
- [flask-realworld-example-app](https://github.com/gothinkster/flask-realworld-example-app),
the "official" example app using Flask by `gothinkster`, a production-grade
example might look like this; could help with best practice and configuring
the codebase
- [conduit-flask](https://github.com/shivaylamba/conduit-flask), another "real-
world" application of Flask
- [Vue.js quickstart](https://vuejs.org/guide/essentials/application.html), the
official quickstart guide for Vue 3
- [Vue Mastery](https://www.vuemastery.com/courses/), a site with video courses
for learning Vue.js (though YouTube + ChatGPT is likely better for this purpose)

### Helpful links

- [Probability & Cribbage](https://pi.math.cornell.edu/~mec/2006-2007/Probability/Cribbage.htm),
courtesy of the [MEC](https://pi.math.cornell.edu/~mec/)
- [Optimal Expected Values for Cribbage Hands](https://www.hmc.edu/wp-content/uploads/sites/49/2018/09/pmartin-2000-thesis.pdf),
a thesis by Philip Martin from ~25 years ago attempting to answer the question:
how advantageous is it to deal first in cribbage?
- [Cribbage Classic](https://cribbageclassic.com/), comes with a tool where you
can analyze discards against the expected value of every possible hand
- [Cribbage Discard Pro](https://cliambrown.com/cribbage/), another discard
analyzer that goes more in-depth (suggested (my implementation) vs. hail mary
vs. aggressive hands)
- [Cribbage Evaluator](https://cribassistant.github.io/sixcard_optimizer.html),
another discard analyzer with a more difficult interface on a PC machine
