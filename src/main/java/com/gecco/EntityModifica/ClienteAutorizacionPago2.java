package com.gecco.EntityModifica;

public class ClienteAutorizacionPago2 {
	Long id;
	String nombre;
	String cedula;
	String direccion;
	String telefono;
	Long idTipoDocumento;
	public ClienteAutorizacionPago2() {
		super();
	}
	public ClienteAutorizacionPago2(Long id, String nombre, String cedula, String direccion, String telefono,
			Long idTipoDocumento) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.cedula = cedula;
		this.direccion = direccion;
		this.telefono = telefono;
		this.idTipoDocumento = idTipoDocumento;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCedula() {
		return cedula;
	}
	public void setCedula(String cedula) {
		this.cedula = cedula;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public Long getIdTipoDocumento() {
		return idTipoDocumento;
	}
	public void setIdTipoDocumento(Long idTipoDocumento) {
		this.idTipoDocumento = idTipoDocumento;
	}
	
}
