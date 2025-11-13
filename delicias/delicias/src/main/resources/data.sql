-- CRIAÇÃO DO BANCO DE DADOS
DROP DATABASE IF EXISTS deliciasdb;
CREATE DATABASE deliciasdb;
USE deliciasdb;

-- TABELA: tb_categoriaProduto
CREATE TABLE IF NOT EXISTS tb_categoria_produto (
  id_categoria BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_categoria VARCHAR(100),
  descricao_categoria VARCHAR(255)
);

-- TABELA: tbTipoProduto
CREATE TABLE IF NOT EXISTS tb_tipo_produto (
  id_tipo_produto BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_tipo_produto VARCHAR(100) NOT NULL,
  descricao_tipo_produto VARCHAR(255)
);

-- TABELA: tb_Endereco
CREATE TABLE IF NOT EXISTS tb_endereco (
  id_endereco BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  bairro VARCHAR(100),
  cep VARCHAR(20),
  cidade VARCHAR(100),
  complemento VARCHAR(100),
  numero VARCHAR(10),
  rua VARCHAR(100),
  uf VARCHAR(5)
);

CREATE TABLE tb_usuario (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    senha VARCHAR(255)
);

-- TABELA: tb_Produtos
CREATE TABLE IF NOT EXISTS tb_produtos (
  id_produto BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_produto VARCHAR(100),
  preco_produto DECIMAL(10,2),
  descricao_produto VARCHAR(255),
  img_url VARCHAR(255),
  id_categoria BIGINT,
  id_tipo_produto BIGINT,
  FOREIGN KEY (id_categoria) REFERENCES tb_categoria_produto(id_categoria),
  FOREIGN KEY (id_tipo_produto) REFERENCES tb_tipo_produto(id_tipo_produto)
);

-- Tabela: tb_Avaliação
CREATE TABLE tb_avaliacoes (
    id_avaliacao BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    nota VARCHAR(5) NOT NULL,
    comentario VARCHAR(500) NOT NULL
);


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
  
  select * from tb_avaliacoes;