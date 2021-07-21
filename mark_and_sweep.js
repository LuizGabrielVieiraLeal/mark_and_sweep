let HEAP = [];

const A = {
  language: "JavaScript",
};

HEAP.push(A);

const root = () => HEAP[0];

const B = {
  language: "Ruby",
};

HEAP.push(B);

// O objeto "B" é acessível a partir de "A" e está alocado na memória
A.B = B;

const C = {
  language: "Dart",
};

HEAP.push(C);

// O objeto "C" é acessível a partir de "A" e está alocado na memória
A.C = C;

// Removendo a referência a "C" de "A"
delete A.C;

const D = {
  language: "GoLang",
};

HEAP.push(D);

// O objeto "D" é acessível a partir de "B" e está alocado na memória
B.D = D;

// Removendo a referência a "B" de "A"
delete A.B;

// Isso significa que "D" ainda tem a referência de "B", mas não é alcançável (porque "B" não está mais acessível)

// Depois destas manipulações, o heap continua contendo quatro objetos:
// [{ A }, { B }, { C }, { D }], mas somente o objeto "A" é acessível (root)

// Garbage collector (utilizando o algorítimo mark and sweep)
const gc = () => {
  // Define __mark__ bits dos objetos acessíveis para 1
  mark();

  // Coleta o lixo (objetos em que o __mark__ bit não foi definido como 1)
  sweep();
};

// Percorrendo todos os objetos alcançáveis, começando pela raiz e definindo o __mark__ bit neles para 1
const mark = () => {
  // Inicialmente somente o root é acessível
  let reachables = [root()];

  while (reachables.length) {
    // Pegando o próximo objeto
    let current = reachables.pop();
    // Marcando o objeto caso ele ainda não tenha sido marcado
    if (!current.__markBit__) {
      current.__markBit__ = 1;
      // Adicionando todos os objetos alcançáveis a partir do objeto atual e os adicionando em um vetor de objetos acessíveis
      for (let i in current) {
        if (typeof current[i] === "object") {
          reachables.push(current[i]);
        }
      }
    }
  }
};

// Traverse the heap and move all unmarked or unreachable objects to the free list.
// Percorrendo o heap atualizando o estado do objetos e removendo todos os objetos não marcados ou não alcançáveis para liberar a memória
const sweep = () => {
  // Atualizando o estado
  HEAP = HEAP.filter((current) => {
    // Redefinindo o __markBit__ dos objetos acessíveis para 0 e os preparando para ciclos futuros da coleta de lixo
    if (current.__markBit__ === 1) {
      current.__markBit__ = 0;
      return true;
    } else return false; // Removendo os objetos não alcançáveis e liberando memória
  });
};

const main = () => {
  console.log("\nEstado do heap antes da coleta de lixo: ", HEAP);

  // Chamada ao coletor de lixo
  gc();

  console.log("\nEstado do heap depois da coleta de lixo: ", HEAP);
};

main();
