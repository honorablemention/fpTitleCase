const articles = ['a', 'an', 'the'];
const conjunctions = [
  'and',
  'as',
  'but',
  'for',
  'if',
  'nor',
  'or',
  'so',
  'yet',
];
const prepositions = [
  'as',
  'at',
  'by',
  'for',
  'in',
  'of',
  'off',
  'on',
  'per',
  'to',
  'up',
  'via',
];

const isShort = (s: string) => s.length < 4;

const capitalizeWord = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const hasSubtitle = (s: string) => {
  return s.includes(':');
};

const getSubtitle = (s: string) => {
  return s.split(':')[1];
};

const containsHyphen = (s: string) => {
  return s.includes('-');
};

const capitalizeHyphenated = (s: string) => {
  return s.split('-').map(capitalizeWord).join('-');
};

const toTitleCase = (s: string) => {
  // has substitle?
  if (hasSubtitle(s)) {
    return s
      .split(':')
      .map((s) => s.trim())
      .map(toTitleCase)
      .join(': ');
  }

  const arr = s.split(' ');

  return arr.reduce(
    (prev: string, curr: string, index: number, arr: string[]) => {
      if (index === 0) {
        arr[index] = capitalizeWord(curr);
      } else if (containsHyphen(curr)) {
        arr[index] = capitalizeHyphenated(curr);
      } else if (
        [...prepositions, ...articles, ...conjunctions].indexOf(curr) === -1
      ) {
        arr[index] = capitalizeWord(curr);
      }
      return arr.join(' ');
    },
    arr[0]
  );
};

// Example test cases
console.log(toTitleCase('the new story'));
console.log(toTitleCase('here is the dog: a memoir'));
