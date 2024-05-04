from card import Card
from collections import deque
import random

suits = ["S", "H", "C", "D"]
ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T',
         'J', 'Q', 'K']


class Deck:
    def __init__(self):
        self.deck = deque([])
        for s in suits:
            for r in ranks:
                self.deck.append(Card(s, r))
        self.num_cards = len(self.deck)

    def __iter__(self):
        return iter(self.deck)

    def __len__(self):
        return len(self.deck)

    def __str__(self):
        out = ""
        for s in suits:
            out += s + ": "
            for r in ranks:
                if self.has(Card(s, r)):
                    out += f" {r}{s} "
                else:
                    out += "    "
            out += '\n'

        return out
        
    # we can add cards back to deck, remove
    # need to add more functionality, will update as I go
    
    def has(self, card):        
        return card in self.deck

    def add(self, card):
        if self.has(card):
            raise ValueError(f"Error: card {card} already in deck")
        self.deck.appendleft(card)
        self.num_cards += 1

    def remove(self, card):
        if not self.has(card):
            raise ValueError(f"Error: cannot remove {card}, not in deck")
        self.deck.remove(card)
        self.num_cards -= 1
        return self

    def remove_hand(self, hand):
        for card in hand:
            self.remove(card)
        return self
        
    def shuffle(self):
        # use Fisher-Yates shuffle, the Durstenfield-Knuth variant
        # this allows O(n), so will do 100 shuffles
        for i in range(100):
            n = self.num_cards
            for i in range(n-1, 0, -1):
                j = random.randint(0, i)
                self.swap(j, i)
        return self

    def swap(self, i, j):
        tmp = self.deck[i]
        self.deck[i] = self.deck[j]
        self.deck[j] = tmp

    def deal(self, hand_size):
        hand = Hand()
        for i in range(hand_size):
            card = self.deck.pop()
            hand.add(card)

        self.num_cards -= hand_size
        return hand


# may make this a subclass of Deck
class Hand:
    def __init__(self, cards = None):
        self.hand = deque([])
        if cards:
            for c in cards:
                self.hand.append(c)

    def __iter__(self):
        return iter(self.hand)

    def __len__(self):
        return len(self.hand)

    def __sub__(self, other):
        set_self = set(self.hand)
        set_other = set(other.hand)
        return Hand(list(set_self - set_other))
    
    def __str__(self):
        out = ""
        for c in self.hand:
            out += f"{c} "
        return out

    def has(self, card):
        return card in self.hand
    
    def add(self, card):
        self.hand.append(card)
        
    def remove(self, card):
        if not self.has(card):
            raise ValueError(f"Error: cannot remove {card}, not in deck")
        self.hand.remove(card)
        
    def sort_hand(self):
        self.hand = sorted(self.hand)
