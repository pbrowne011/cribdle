from card import Card
from deck import Deck, Hand
import random

suits = ["S", "H", "C", "D"]
ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T',
         'J', 'Q', 'K']

# what is the logic of setup?
#
# needs parameter
#   easy | hard
#
# then it does the following
# determine highest possible scoring hand
# select random cut card & compute points

def calculate_best_hand(deck):
    return 1



def main():
    is_easy = True
    deck = Deck()

    if is_easy:
        ranks_to_remove = 3
    else:
        ranks_to_remove = 7
        
    to_remove = []
        
    while ranks_to_remove > 0:
        # pick random rank that hasn't been chosen
        r = ranks[random.randint(0, 12)]
        if r in to_remove:
            continue
            
        deck.remove_rank(r)
        ranks_to_remove -= 1
        
    print(deck)
    deck.shuffle()
    player_hand = deck.deal(4)
    print(deck)
    opponent_hand = deck.deal(4)
    print(deck)
    print(player_hand, opponent_hand)

    
if __name__ == "__main__":
    main()
