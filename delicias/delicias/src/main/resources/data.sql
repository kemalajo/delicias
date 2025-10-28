

-- INSERINDO DADOS EM tb_Endereco
INSERT INTO tb_endereco (bairro, cep, cidade, complemento, numero, rua, uf) VALUES
('Centro', '80000-000', 'Curitiba', 'Próximo à praça central', '123', 'Rua das Flores', 'PR'),
('Jardins', '01000-000', 'São Paulo', 'Bloco B', '45', 'Av. Brasil', 'SP'),
('Boa Viagem', '50000-000', 'Recife', 'Apto 101', '99', 'Rua Atlântica', 'PE');

-- INSERINDO DADOS EM tb_Produtos
INSERT INTO tb_tipo_produto (nome_tipo_produto, descricao_tipo_produto)
VALUES
('Comum', 'Produtos tradicionais'),
('Diet', 'Produtos sem açúcar ou com baixo teor calórico');

INSERT INTO tb_categoria_produto (nome_categoria, descricao_categoria)
VALUES
('Bolos', 'Bolos de diversos sabores'),
('Doces', 'Doces variados e sobremesas');

INSERT INTO tb_produtos (
  preco_produto, id_categoria, id_tipo_produto, descricao_produto, img_url, nome_produto
) VALUES
  (25.00, 1, 1, 'Bolo com cobertura de chocolate meio amargo', 'https://i.pinimg.com/1200x/3f/b8/3e/3fb83e8b37796cd6bd2d94c85d2fb7e1.jpg', 'Bolo de Chocolate'),
  (6.00, 2, 1, 'Coxinha de morango', 'https://i.pinimg.com/736x/82/c3/a1/82c3a19907f84d3ae3737756ba22ed88.jpg', 'Coxinha De Morango'),
  (8.50, 2, 2, 'Doce sem açúcar, com leite desnatado', 'https://i.pinimg.com/1200x/6b/ad/a2/6bada227bcd8ad8650a52d3065739d1d.jpg', 'Doce de Leite Diet'),
  (5.00, 2, 1, 'Biscoitinho de gengibre personalizado', 'https://i.pinimg.com/736x/28/19/b3/2819b32d629845033d9c351f945a727b.jpg', 'Biscoito de Gengibre'),
  (7.00, 1, 1, 'Bolo de Cenoura recheado com cobertura de chocolate', 'https://i.pinimg.com/1200x/82/c1/94/82c19485a4c3498fb6d77853b32ab5f7.jpg', 'Bolo de Cenoura');


INSERT INTO tb_tipo_produto (nome_tipo_produto, descricao_tipo_produto)
VALUES ('Doce', 'Produtos doces e sobremesas');

