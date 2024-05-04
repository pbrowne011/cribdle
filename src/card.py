class Card:
    ranks = {'T': 0, 'J': 1, 'Q': 2, 'K': 3}
    suits = {'C': 0, 'H': 1, 'S': 2, 'D': 3}

    # cards have rank, suit, value [1-10] and ivalue [1-13]
    # ivalue is to determine ordering
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
            self.ivalue = self.value
        elif self.rank in {'T', 'J', 'Q', 'K'}:
            self.value = 10
            self.ivalue = self.value + self.ranks[self.rank]
        elif self.rank in [str(i) for i in range(2, 10)]:
            self.value = int(self.rank)
            self.ivalue = self.value
        else:
            raise ValueError("Error: invalid rank", self.rank)

    def __eq__(self, other):
        return (self.suit == other.suit) and (self.rank == other.rank)

    def __hash__(self):
        return hash((self.rank, self.suit))
    
    def __lt__(self, other):
        if self.ivalue != other.ivalue:
            return self.ivalue < other.ivalue
        return self.suits[self.suit] < self.suits[other.suit]

    def __repr__(self):
        return f"{self.rank}{self.suit}"
        
    def __str__(self):
        return f"{self.rank}{self.suit}"

    def get_ivalue(self):
        return self.ivalue
    
    def get_suit(self):
        return self.suit

    def get_rank(self):
        return self.rank
    
    def get_value(self):
        return self.value
