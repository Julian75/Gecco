package com.gecco.EntityModifica;

public class DetalleArticulo2 {

	Long id;
	Long idArticulo;
	String serial;
	Long idEstado;
	Long idUsuario;
	String placa;
	String marca;
	String codigo_contable;
	Long idTipoActivo;
	double valor;
	Long idOrdenCompra;
	
	public DetalleArticulo2() {
		super();
	}

	public DetalleArticulo2(Long id, Long idArticulo, String serial, Long idEstado, Long idUsuario, String placa,
			String marca, String codigo_contable, Long idTipoActivo, double valor, Long idOrdenCompra) {
		super();
		this.id = id;
		this.idArticulo = idArticulo;
		this.serial = serial;
		this.idEstado = idEstado;
		this.idUsuario = idUsuario;
		this.placa = placa;
		this.marca = marca;
		this.codigo_contable = codigo_contable;
		this.idTipoActivo = idTipoActivo;
		this.valor = valor;
		this.idOrdenCompra = idOrdenCompra;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdArticulo() {
		return idArticulo;
	}

	public void setIdArticulo(Long idArticulo) {
		this.idArticulo = idArticulo;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getCodigo_contable() {
		return codigo_contable;
	}

	public void setCodigo_contable(String codigo_contable) {
		this.codigo_contable = codigo_contable;
	}

	public Long getIdTipoActivo() {
		return idTipoActivo;
	}

	public void setIdTipoActivo(Long idTipoActivo) {
		this.idTipoActivo = idTipoActivo;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public Long getIdOrdenCompra() {
		return idOrdenCompra;
	}

	public void setIdOrdenCompra(Long idOrdenCompra) {
		this.idOrdenCompra = idOrdenCompra;
	}

}
