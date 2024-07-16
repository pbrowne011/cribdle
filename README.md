# Cribdle

A cribbage game based off of Wordle. Play at [cribdle.com](cribdle.com)

## How to play

**TODO**: shorten and write good intro

In a two player game of cribbage, each player receives six cards. They must
choose to keep four and discard two, putting them in the crib of the player who
dealt.

In Cribdle, you are given a random hand and have to decide what to discard. Your
opponent is receiving the crib, so you don't want to throw away good cards just
to make your hand.

When you select two cards to discard, you get either a green, yellow, or red
background.
- **Red**: both the cards you selected were wrong
- **Yellow**: one of the cards you selected was wrong, and one was correct
- **Green**: both cards are correct. You win!

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

### Resources for Flask

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
