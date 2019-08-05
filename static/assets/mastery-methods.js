//Verbs needed for blooms taxonomy
//should be random array with one primary verb.

const remember = ["remember", "define", "duplicate", "list", "memorize", "repeat", "state",]
const understand = ["understand", "classify", "describe", "discuss", "explain", "identify", "locate", "recognize", "report", "select", "translate"]
const apply = ["apply", "execute", "implement", "solve", "use", "demonstrate", "interpret", "operate", "schedule", "sketch"]
const analyze = ["analyze", "differentiate", "organize", "relate", "compare", "contrast", "distinguish", "examine", "experiment", "question", "test"]
const evaluate = ["evaluate", "appraise", "argue", "judge", "defend", "select", "support", "value", "critique", "weigh"]
const create = ["create", "design", "assemble", "construct", "conjecture", "develop", "formulate", "author", "investigate"]


const bloomsMethods = {
  1: remember,
  2: understand,
  3: apply,
  4: analyze,
  5: evaluate,
  6: create,
}

console.log(bloomsMethods);
