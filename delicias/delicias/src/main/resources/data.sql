-- Inserts de Produtos Doces
INSERT INTO produto (nome, preco, categoria, descricao) VALUES
('Bolo', 80.00, 'Doce', 'Bolo caseiro macio, ideal para festas.'),
('Cupcake', 10.50, 'Doce', 'Mini bolo decorado, ideal para festas ou sobremesas.'),
('Brownie', 8.50, 'Doce', 'Quadrado de chocolate úmido e denso.'),
('Cookie', 12.00, 'Doce', 'Biscoito crocante por fora e macio por dentro.'),
('Croissant', 13.50, 'Padaria', 'Massa folhada recheada, leve e amanteigada.'),
('Torta Doce', 70.00, 'Doce', 'Torta caseira com variados recheios.'),
('Brigadeiro', 4.50, 'Doce', 'Docinho brasileiro feito com leite condensado e chocolate.'),
('Pudim', 50.00, 'Doce', 'Clássico pudim de leite condensado com calda de caramelo.'),
('Kit Festa', 180.00, 'Doce', 'Inclui 1 bolo (sabor à escolha), 30 mini salgados (à escolha) e 20 brigadeiros (à escolha).');

-- Inserts de Produtos Salgados
INSERT INTO produto (nome, preco, categoria, descricao) VALUES
('Torta Salgada', 95.00, 'Salgado', 'Torta recheada com ingredientes variados.'),
('Coxinha', 10.00, 'Salgado', 'Salgado frito recheado, tradicional brasileiro.'),
('Kibe', 9.50, 'Salgado', 'Salgado tradicional de carne temperada.'),
('Empada', 10.50, 'Salgado', 'Massa recheada com frango ou palmito.'),
('Esfiha', 9.00, 'Salgado', 'Massa aberta recheada com carne, frango ou queijo.'),
('Bolinho de Queijo', 6.50, 'Salgado', 'Bolinho frito recheado com queijo cremoso.');

-- Inserts de Sabores

-- Cupcake
INSERT INTO sabor (produto_id, nome) VALUES
(2, 'Chocolate'),
(2, 'Morango'),
(2, 'Chocolate Branco'),
(2, 'Chocolate Meio Amargo');

-- Brownie
INSERT INTO sabor (produto_id, nome) VALUES
(3, 'Tradicional'),
(3, 'Chocolate Meio Amargo'),
(3, 'Ninho com Nutella');

-- Cookie
INSERT INTO sabor (produto_id, nome) VALUES
(4, 'Tradicional'),
(4, 'Chocolate Branco'),
(4, 'Chocolate Meio Amargo'),
(4, 'Creme de Avelã'),
(4, 'Pistache');

-- Croissant
INSERT INTO sabor (produto_id, nome) VALUES
(5, 'Chocolate ao Leite'),
(5, 'Morango com Creme de Avelã'),
(5, 'Pistache');

-- Torta Doce
INSERT INTO sabor (produto_id, nome) VALUES
(6, 'Morango'),
(6, 'Maçã'),
(6, 'Banana'),
(6, 'Chocolate'),
(6, 'Limão');

-- Brigadeiro
INSERT INTO sabor (produto_id, nome) VALUES
(7, 'Tradicional'),
(7, 'Ninho com Nutella'),
(7, 'Beijinho');

-- Torta Salgada
INSERT INTO sabor (produto_id, nome) VALUES
(10, 'Frango'),
(10, 'Palmito');

-- Coxinha
INSERT INTO sabor (produto_id, nome) VALUES
(11, 'Frango'),
(11, 'Costela');

-- Kibe
INSERT INTO sabor (produto_id, nome) VALUES
(12, 'Tradicional');

-- Empada
INSERT INTO sabor (produto_id, nome) VALUES
(13, 'Frango'),
(13, 'Palmito');

-- Esfiha
INSERT INTO sabor (produto_id, nome) VALUES
(14, 'Carne'),
(14, 'Frango'),
(14, 'Queijo');
