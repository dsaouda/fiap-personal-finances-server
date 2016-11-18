-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 17/11/2016 às 17:56
-- Versão do servidor: 5.6.28-0ubuntu0.14.04.1
-- Versão do PHP: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `fiap_gastos_v2`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` tinytext NOT NULL,
  `recorrente` tinyint(1) NOT NULL DEFAULT '0',
  `icone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recorrente` (`recorrente`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Fazendo dump de dados para tabela `categoria`
--

INSERT INTO `categoria` (`id`, `nome`, `descricao`, `recorrente`, `icone`) VALUES
(1, 'Alimentação', 'Gastos com almoço, janta, café ...', 0, NULL),
(2, 'Casa / Luz', 'Luz', 1, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `conta`
--

CREATE TABLE IF NOT EXISTS `conta` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` tinytext NOT NULL,
  `saldo` decimal(9,2) NOT NULL,
  `cor` char(15) DEFAULT NULL COMMENT 'Cor de identificação da conta',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Fazendo dump de dados para tabela `conta`
--

INSERT INTO `conta` (`id`, `nome`, `descricao`, `saldo`, `cor`) VALUES
(1, 'Bradesco - 0105/0247294-5', 'Agência na paulista', '100.00', '#FF3232');

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico`
--

CREATE TABLE IF NOT EXISTS `historico` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `conta_id` int(11) unsigned NOT NULL,
  `categoria_id` int(11) unsigned DEFAULT NULL,
  `docto` varchar(32) DEFAULT NULL,
  `data_movimento` date NOT NULL,
  `data_vencimento` date DEFAULT NULL,
  `descricao` varchar(100) NOT NULL,
  `observacao` text,
  `valor` decimal(9,2) NOT NULL,
  `status` enum('P','A') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  UNIQUE KEY `docto` (`docto`,`data_movimento`,`valor`),
  KEY `conta_id` (`conta_id`),
  KEY `categoria_id` (`categoria_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Fazendo dump de dados para tabela `historico`
--

INSERT INTO `historico` (`id`, `conta_id`, `categoria_id`, `docto`, `data_movimento`, `data_vencimento`, `descricao`, `observacao`, `valor`, `status`) VALUES
(1, 1, 1, '123', '2016-11-17', '2016-11-16', 'Descrição', 'Observaçao', '100.00', 'A'),
(2, 1, 1, '123', '2016-11-17', '2016-11-16', 'Descrição 2', 'Observaçao 2', '1000.00', 'A');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
