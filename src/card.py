class Card:
    def __init__(self, suit, rank):
        if type(suit) != str:
            raise TypeError("Error: suit must be of type <str>")
        if suit not in {"C", "H", "S", "D"}:
            raise ValueError("Error: suit must be one of {C H S D}")
        if type(rank) != str:
            raise TypeError("Error: rank must be of type <str>")
        self.suit = suit
        self.rank = rank

        if self.rank == 'A':
            self.value = 1
        elif self.rank in {'T', 'J', 'Q', 'K'}:
            self.value = 10
        elif self.rank in [str(i) for i in range(2, 10)]:
            self.value = int(self.rank)
        else:
            raise ValueError("Error: invalid rank", self.rank)

    def __str__(self):
        return f"{self.rank}{self.suit}"

    def __eq__(self, other):
        return (self.suit == other.suit) and (self.rank == other.rank)
    
    def get_suit(self):
        return self.suit

    def get_rank(self):
        return self.rank

    def get_value(self):
        return self.value
