const jsChessEngine = require('js-chess-engine')
const prompt = require('prompt-sync')()

const game = new jsChessEngine.Game()

class ChessMasterTradingBot {
    constructor(pairs) {
        this.pairs = pairs;
        // this.chessEngine = jsChessEngine.engine.SimpleEngine.popen_uci("path/to/chess_engine");
        this.ChessEngine = new jsChessEngine.Game(
            {
                "turn": "black",
                "pieces": {
                    "E1": "K",
                    "C1": "B",
                    "E8": "k"
                },
                "moves": {
                  "E8": ["E7", "F8", "F7", "D8", "D7"]
                },
                "isFinished": false,
                "check": false,
                "checkMate": false,
                "castling": {
                    "whiteLong": true,
                    "whiteShort": true,
                    "blackLong": true,
                    "blackShort": true    
                },
                "enPassant": "E6",
                "halfMove": 0,
                "fullMove": 1
            }
        )
    }

    makeTradeDecision() {
        
        for (let pair of this.pairs) {
            // Retrieve current market data for the pair
            let marketData = this.retrieveMarketData(pair);
            console.log(marketData)
            // Use chess engine to analyze market data and make a trade decision
            this.chessEngine.position(marketData);
            let tradeDecision = this.chessEngine.play(Chess.engine.Limit(time = 0.1));
            trades.push([pair, tradeDecision]);
        }
        return trades;
    }

    retrieveMarketData(pair) {
        // Replace this with code to retrieve market data for the given pair
        // return readCSV(`market_data_${pair}.csv`);
        console.log(pair)
    }

    executeTrade(trade) {
        // Replace this with code to execute the given trade
        console.log(`Executing trade: ${trade}`);
    }

}

let enteredPairs = []
for (let i = 0; i < 3; i++) {
    let value = prompt("Enter Trading pairs one: ")
    enteredPairs.push(value)
}

let bot = new ChessMasterTradingBot(enteredPairs);

while (true) {
    // Make trade decisions
    let trades = bot.makeTradeDecision();
    // Execute trades
    for (let trade of trades) {
        bot.executeTrade(trade);
    }
    
    console.log(bot);
}

