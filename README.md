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

- [ ] Change gameplay to discard style
- [ ] Calculate expected value of a hand based on cards left in the deck
- [ ] Change easy and hard modes to (show correct guess) and (show nothing)
- [ ] Build flask app to play game over website (many subtasks here)
- [ ] Use Vue.js to design the app (many subtasks here)

### Helpful links

- [Probability & Cribbage](https://pi.math.cornell.edu/~mec/2006-2007/Probability/Cribbage.htm),
courtesy of the [MEC](https://pi.math.cornell.edu/~mec/)
- [Optimal Expected Values for Cribbage Hands](https://www.hmc.edu/wp-content/uploads/sites/49/2018/09/pmartin-2000-thesis.pdf),
a thesis by Philip Martin from ~25 years ago attempting to answer the question:
how advantageous is it to deal first in cribbage?
