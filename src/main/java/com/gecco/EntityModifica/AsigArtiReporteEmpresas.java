package com.gecco.EntityModifica;

public class AsigArtiReporteEmpresas {
	
	Long id;
	String tipoArticulo;
	String placa;
	String marca;
	String serial;
	String tipoActivo;
	String categoria;
	String nombre_oficina;
	String nombre_sitio_venta;
	String nombreUsuario;
	String apellidoUsuario ;
	
	public AsigArtiReporteEmpresas() {
		super();
	}

	public AsigArtiReporteEmpresas(Long id, String tipoArticulo, String placa, String marca, String serial,
			String tipoActivo, String categoria, String nombre_oficina, String nombre_sitio_venta, String nombreUsuario,
			String apellidoUsuario) {
		super();
		this.id = id;
		this.tipoArticulo = tipoArticulo;
		this.placa = placa;
		this.marca = marca;
		this.serial = serial;
		this.tipoActivo = tipoActivo;
		this.categoria = categoria;
		this.nombre_oficina = nombre_oficina;
		this.nombre_sitio_venta = nombre_sitio_venta;
		this.nombreUsuario = nombreUsuario;
		this.apellidoUsuario = apellidoUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipoArticulo() {
		return tipoArticulo;
	}

	public void setTipoArticulo(String tipoArticulo) {
		this.tipoArticulo = tipoArticulo;
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

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public String getTipoActivo() {
		return tipoActivo;
	}

	public void setTipoActivo(String tipoActivo) {
		this.tipoActivo = tipoActivo;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getNombre_oficina() {
		return nombre_oficina;
	}

	public void setNombre_oficina(String nombre_oficina) {
		this.nombre_oficina = nombre_oficina;
	}

	public String getNombre_sitio_venta() {
		return nombre_sitio_venta;
	}

	public void setNombre_sitio_venta(String nombre_sitio_venta) {
		this.nombre_sitio_venta = nombre_sitio_venta;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getApellidoUsuario() {
		return apellidoUsuario;
	}

	public void setApellidoUsuario(String apellidoUsuario) {
		this.apellidoUsuario = apellidoUsuario;
	}
	
}
