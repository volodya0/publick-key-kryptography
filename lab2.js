//Повідомлення, яке потрібно закодувати
const message = 'YUZIUK VOLODYMYR KI2019'

//Алфавіт
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('')

//Функція для отримання номера символу у алфавіті
const getNum = (letter) => alphabet.findIndex(s => s === letter.toLocaleLowerCase()) + 1

//Функція для отримання символу зв номером
const getLetter = (num) => alphabet[+num - 1]

//Функція для знаходження НСД двох чисел
const NSD = (a, b) => {
  for(let i = Math.min(a,b); i > 0; i--)
    if (!(a % i)&&(!(b % i))) return i 
}

//Обираємо два простих числа
const p = 17
const q = 19

//Знаходимо n і ф(n) за формулами
const n = p * q 
const f_n = (p - 1)*(q - 1)

//Підбираємо е
let e
  for(let i = 2; i < f_n; i++){
    if(NSD(i, f_n) === 1){
    e = i; 
    break;
  }}

//Підбираємо взаємнопросте число d
let d 
  for(let i = 1; i < f_n; i++){
    if(((i * e) % f_n) === 1){
      d = i; 
      break;
    } 
  }

console.log('');
console.log('***************** КОДУВАННЯ *****************');
console.log('p :>> ', p);
console.log('q :>> ', q);
console.log('n : ', n);
console.log('ф(n) : ', f_n);
console.log('e : ', e);
console.log('d : ', d);
console.log(`Відкритий ключ : (${e}, ${f_n})`);
console.log(`Секретний ключ : (${d}, ${f_n})`);
console.log('Повідомлення : ', message);

//Створуємо таблицю з символами та ключами
const objects = []
message.split('').forEach((letter, i) => {
  const num = getNum(letter)
  objects[i] = {
    'Літера' : letter,
    'Номер' : num,
    // Закодовуємо символ за допомогою відкритого ключа
    'Код' : parseInt((BigInt(num) ** BigInt(e)) % BigInt(n))
  }
})

//Отримуємо закодоване повідомлення
const E = objects.reduce((acc, obj) => acc += obj['Код'] + ' ', '')
console.log('Таблиця :', objects);
console.log('Закодоване повідомлення : ', E);
console.log('');
console.log('***************** ДЕКОДУВАННЯ *****************');

//Обираємо закодоване повідомлення
const secret_E = E
console.log('Закодоване повідомлення : ', secret_E);
console.log(`Секретний ключ : (${d}, ${f_n})`);

//Виконуємо декодування за допосогою секретного ключа
//Отримуєсо номери символів
const letterNumbers = secret_E.split(' ').map(code => parseInt(((BigInt(code) ** (BigInt(d)) % BigInt(n)))))
console.log('Номери символів у алфавіті : ', letterNumbers.join());

const msg = letterNumbers.map(num => getLetter(num)).join('').toUpperCase()
console.log('Повідомлення : ', msg);

