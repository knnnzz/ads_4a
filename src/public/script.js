
const produtoForm = document.getElementById('produtoForm');

produtoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(produtoForm);
  const requestData = {
    codprod: formData.get('codprod'),
    numlote: formData.get('numlote'),
    nomeprod: formData.get('nomeprod'),
    validade: formData.get('validade'),
    datafab: formData.get('datafab')
  };

  try {
    const response = await fetch('/api/produtos', { // Rota da API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const responseData = await response.json();
    alert(responseData.message); // Exibe mensagem de sucesso da API
    produtoForm.reset();
  } catch (error) {
    alert('Erro ao cadastrar produto. Verifique os dados e tente novamente.');
  }
});
