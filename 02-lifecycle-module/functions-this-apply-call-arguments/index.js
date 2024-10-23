"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString())
// })

const file = new File();

// Alternativa para nao herdar o this da função
// watch(__filename, (event, filename) => file.watch(event, filename))

//Podemos deixar explicito qual é o contexto que a função deve seguir
// o bind retorna uma função com o this que se mantem do file, ignorando o watch
watch(__filename, file.watch.bind(file));

// a diferença entre um e outro, é que um você passa os argumentos como array e outro uma lista de argumentos
file.watch.call({ showContent: () => console.log("call: hey sinon") }, null, __filename);
file.watch.apply({ showContent: () => console.log("call: hey sinon") }, [null, __filename]);
