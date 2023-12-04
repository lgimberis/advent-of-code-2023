"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumPossibleGameIds = void 0;
function isGameValid(splitSets, gameSetup) {
    var e_1, _a, e_2, _b;
    console.log(splitSets);
    try {
        for (var splitSets_1 = __values(splitSets), splitSets_1_1 = splitSets_1.next(); !splitSets_1_1.done; splitSets_1_1 = splitSets_1.next()) {
            var set = splitSets_1_1.value;
            try {
                for (var _c = (e_2 = void 0, __values(['red', 'green', 'blue'])), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var colour = _d.value;
                    var match = set.match(new RegExp("(\\d+) ".concat(colour)));
                    if (match && match[1] > gameSetup[colour]) {
                        return false;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (splitSets_1_1 && !splitSets_1_1.done && (_a = splitSets_1.return)) _a.call(splitSets_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
function sumPossibleGameIds(gameOutcomes, gameSetup) {
    var e_3, _a;
    var sum = 0;
    var games = gameOutcomes.split('\n');
    try {
        for (var games_1 = __values(games), games_1_1 = games_1.next(); !games_1_1.done; games_1_1 = games_1.next()) {
            var game = games_1_1.value;
            var gameValueMatch = game.match(/(?<=Game )\d+/);
            if (!gameValueMatch) {
                continue;
            }
            var gameValue = parseInt(gameValueMatch[0]);
            var sets = game.split(":")[1]; // assumes good input
            var splitSets = sets.split(";");
            if (isGameValid(splitSets, gameSetup)) {
                sum += gameValue;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (games_1_1 && !games_1_1.done && (_a = games_1.return)) _a.call(games_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return sum;
}
exports.sumPossibleGameIds = sumPossibleGameIds;
if (require.main === module) {
    var fs = require('node:fs');
    fs.readFile("./day_02_data.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(sumPossibleGameIds(data, { red: 12, green: 13, blue: 14 }));
    });
}
