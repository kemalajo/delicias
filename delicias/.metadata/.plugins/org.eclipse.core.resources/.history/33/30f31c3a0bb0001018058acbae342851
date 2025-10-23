package com.senai.delicias.entities;

	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.Table;

	@Entity
	@Table(name = "tb_Endereco")
	public class Endereco {

		// Atributos
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "idEndereco")
		private Long idEndereco;

		@Column
		private String bairro;

		@Column
		private String rua;

		@Column
		private String cidade;

		@Column
		private String numero;

		@Column
		private String cep;

		@Column
		private String complemento;

		@Column
		private String uf;
		
		@ManyToOne
		@JoinColumn(name = "Cliente", nullable = true)
		private Usuario cliente;

		public Endereco() {

		}

		public Endereco(Long idEndereco, String bairro, String rua, String cidade, String numero, String cep,
				String complemento, String uf, Usuario cliente) {
			this.idEndereco = idEndereco;
			this.bairro = bairro;
			this.rua = rua;
			this.cidade = cidade;
			this.numero = numero;
			this.cep = cep;
			this.complemento = complemento;
			this.uf = uf;
			this.cliente = cliente;
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

		public Usuario getUsuarios() {
			return cliente;
		}

		public void setUsuarios(Usuario usuarios) {
			this.cliente = usuarios;
		}
		
		
	}