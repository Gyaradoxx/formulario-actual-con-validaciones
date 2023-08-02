

const texto = "Avel·lí"

// i es para case Insensitive (no diferencia mayúsculas de minúsculas)
const patron = /^[ ·a-zA-ZñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙüÚïÏâêîôû]+$/

console.log(patron.test(texto))

// console.log(patron.exec(texto))

