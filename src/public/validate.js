document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productCode = document.getElementById('productCode').value;
    const resultDiv = document.getElementById('result');

    fetch('http://localhost:3001/api/produtos')
        .then(response => response.json())
        .then(data => {
            const product = data.find(prod => prod.codprod === productCode);

            if (product) {
                resultDiv.className = 'found';
                resultDiv.innerHTML = `
                    <p><strong>Produto Encontrado:</strong></p>
                    <p><strong>ID: </strong>${product.id}</p>
                    <p><strong>Código: </strong>${product.codprod}</p>
                    <p><strong>Nome: </strong>${product.nomeprod}</p>
                    <p><strong>Lote: </strong>${product.numlote}</p>
                    <p><strong>Validade: </strong>${new Date(product.validade).toLocaleDateString()}</p>
                    <p><strong>Data de Fabricação: </strong>${new Date(product.datafab).toLocaleDateString()}</p>
                `;
            } else {
                resultDiv.className = 'not-found';
                resultDiv.innerHTML = '<p><strong>Produto não encontrado.</p></strong>';
                alert('Produto não encontrado.');
            }
        })
        .catch(error => {
            console.error('Error fetching the products:', error);
            resultDiv.className = 'not-found';
            resultDiv.innerHTML = '<p>Erro ao buscar produtos. Tente novamente mais tarde.</p>';
            alert('Erro ao buscar produtos. Tente novamente mais tarde.');
        });
});
