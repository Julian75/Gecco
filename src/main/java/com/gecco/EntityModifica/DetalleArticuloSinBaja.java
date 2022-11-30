package com.gecco.EntityModifica;

public class DetalleArticuloSinBaja {

	Long idDetalleArticulo;
	String tipoActivo;
	String marca;
	String placa;
	String serial;
	String nombre;
	String apellido;
	
	public DetalleArticuloSinBaja() {
		super();
	}

	public DetalleArticuloSinBaja(Long idDetalleArticulo, String tipoActivo, String marca, String placa, String serial,
			String nombre, String apellido) {
		super();
		this.idDetalleArticulo = idDetalleArticulo;
		this.tipoActivo = tipoActivo;
		this.marca = marca;
		this.placa = placa;
		this.serial = serial;
		this.nombre = nombre;
		this.apellido = apellido;
	}

	public Long getIdDetalleArticulo() {
		return idDetalleArticulo;
	}

	public void setIdDetalleArticulo(Long idDetalleArticulo) {
		this.idDetalleArticulo = idDetalleArticulo;
	}

	public String getTipoActivo() {
		return tipoActivo;
	}

	public void setTipoActivo(String tipoActivo) {
		this.tipoActivo = tipoActivo;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	
}
