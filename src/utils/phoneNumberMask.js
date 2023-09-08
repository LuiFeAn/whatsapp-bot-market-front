export default function formatarTelefone(telefone) {
    // Remove todos os caracteres não numéricos da string
    telefone = telefone.replace(/\D/g, '');
  
    // Verifica se o número de telefone tem pelo menos 10 dígitos
    if (telefone.length >= 10) {
      // Aplica a máscara "(XX) XXXX-XXXX"
      telefone = `(${telefone.substring(0, 2)}) ${telefone.substring(2, 6)}-${telefone.substring(6, 10)}`;
    }
  
    return telefone;
}
  
