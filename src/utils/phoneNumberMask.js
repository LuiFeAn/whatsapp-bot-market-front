export default function phoneMas(phone){


    const numeros = phone.replace(/\D/g, '');

    const telefoneFormatado = `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6, 10)}`;

    return telefoneFormatado;
}
