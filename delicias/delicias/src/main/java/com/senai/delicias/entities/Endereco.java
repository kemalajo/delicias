package com.senai.delicias.entities;

	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;

	@Entity
	@Table(name = "tb_Endereco")
	public class Endereco {

		// Atributos
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "idEndereco")
		private Long idEndereco;

		@Column(name = "bairro")
		private String bairro;

		@Column(name = "rua")
		private String rua;

		@Column(name = "cidade")
		private String cidade;

		@Column(name = "numero")
		private String numero;

		@Column(name = "cep")
		private String cep;

		@Column(name = "complemento")
		private String complemento;

		@Column(name = "uf")
		private String uf;

		public Endereco() {

		}

		public Endereco(Long idEndereco, String bairro, String rua, String cidade, String numero, String cep,
				String complemento, String uf) {
			this.idEndereco = idEndereco;
			this.bairro = bairro;
			this.rua = rua;
			this.cidade = cidade;
			this.numero = numero;
			this.cep = cep;
			this.complemento = complemento;
			this.uf = uf;
		}

		public Long getIdEndereco() {
			return idEndereco;
		}

		public void setIdEndereco(Long idEndereco) {
			this.idEndereco = idEndereco;
		}

		public String getBairro() {
			return bairro;
		}

		public void setBairro(String bairro) {
			this.bairro = bairro;
		}

		public String getRua() {
			return rua;
		}

		public void setRua(String rua) {
			this.rua = rua;
		}

		public String getCidade() {
			return cidade;
		}

		public void setCidade(String cidade) {
			this.cidade = cidade;
		}

		public String getNumero() {
			return numero;
		}

		public void setNumero(String numero) {
			this.numero = numero;
		}

		public String getCep() {
			return cep;
		}

		public void setCep(String cep) {
			this.cep = cep;
		}

		public String getComplemento() {
			return complemento;
		}

		public void setComplemento(String complemento) {
			this.complemento = complemento;
		}

		public String getUf() {
			return uf;
		}

		public void setUf(String uf) {
			this.uf = uf;
		}
	}