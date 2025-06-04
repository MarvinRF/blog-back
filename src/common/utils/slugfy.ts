export function slugfy(text: string): string {
  return text
    .normalize('NFKD') //separa acentos de letras ex: á -> a
    .toLocaleLowerCase() //tudo minusculo
    .replace(/[\u0300-\u036f]/g, '') //remove acentos e marcadores unicos
    .replace(/[^a-z0-9]+/g, ' ') //troca tudo que não for letra e numero por (espaco)
    .replace(/(^-|-$)/g, '') //remove - do inicio e fim
    .trim() //remove espaços do inicio e fim
    .replace(/(\s+)/g, '-'); // espaço -> Hífen
}
