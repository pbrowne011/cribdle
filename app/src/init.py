from .card import Card
from .deck import Deck, Hand
from itertools import combinations, permutations
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

def score(hand, cut_card):
    hand.add(cut_card)
    len_hand = len(hand)
    score = 0

    for i in range(2, len_hand+1):
        for cards in combinations(hand, i):
            # count pairs
            if i == 2 and cards[0].get_rank() == cards[1].get_rank():
                score += 2
            # count fifteens
            if sum([c.get_value() for c in cards]) == 15:
                score += 2

    # count runs
    hand.sort_hand()
    run_dict = dict()
    for card in hand:
        v = card.get_ivalue()
        if len(run_dict.keys()) > 0:
            if v in run_dict.keys():
                run_dict[v] += 1
            elif v-1 in run_dict.keys():
                run_dict[v] = 1
            elif len(run_dict.keys()) < 3:
                run_dict = {v: 1}
        else:
            run_dict = {v: 1}    

    lst = [i for i in run_dict.values() if i > 1]
    if len(run_dict.values()) >= 3:
        if len(lst) > 0:
            rn_score = sum([i * len(run_dict.values()) for i in lst])
        else:
            rn_score = len(run_dict.values())
    else:
        rn_score = 0
    score += rn_score
    
    hand.remove(cut_card)
    cut_suit = cut_card.get_suit()
    
    # count flush, make sure 4-card hand
    hand_suits = [c.get_suit() for c in hand]
    if len(hand_suits) == 4 and all([s == hand_suits[0] for s in hand_suits]):
        score += 4
        if cut_suit == hand_suits[0]:
            score += 1
    
    # count right jack
    for c in hand:
        if c.get_rank() == 'J' and c.get_suit() == cut_suit:
            score += 1

    return score
    

def get_best_hand(hand):
    max_ev = 0
    ev_deck = Deck().remove_hand(hand)


    for player_hand in combinations(hand, 4):
        player_hand = Hand(player_hand)
        opponent_crib = hand - player_hand
        total = 0
        
        for card in ev_deck:
            x = score(player_hand, card) - score(opponent_crib, card)
            total += score(player_hand, card)
            total -= score(opponent_crib, card)
        ev = total / len(ev_deck)
        if ev > max_ev:
            max_ev = ev
            best_hand = player_hand

    return (max_ev, best_hand)
    
# calculate cards to discard that maximize EV of hand
def discard(hand):
    return get_best_hand(hand)

def init():
    is_easy = False
    deck = Deck()
                
    deck.shuffle()
    player_hand = deck.deal(6)
    opponent_hand = deck.deal(6)
    print("\nPlayer hand:", player_hand)
    print("Opponent hand:", opponent_hand)

    ev_player, soln_player = discard(player_hand)
    ev_opponent, soln_opponent = discard(opponent_hand)
    print("Player solution:", soln_player, ev_player)
    print("Opponent solution:", soln_opponent, ev_opponent)
    
    return {
        "player_hand": player_hand,
        "opponent_hand": opponent_hand,
        "soln_player": soln_player,
        "soln_opponent": soln_opponent
    }
    
# if __name__ == "__main__":
    # init()
