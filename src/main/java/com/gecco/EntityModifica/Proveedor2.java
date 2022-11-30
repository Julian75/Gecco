package com.gecco.EntityModifica;

public class Proveedor2 {
	
	Long id;
	String nombre;
	String documento;
	Long idTipoDocumento;
	String telefono;
	String direccion;
	String observacion;
	Long idEstado;
	
	public Proveedor2() {
		super();
	}

	public Proveedor2(Long id, String nombre, String documento, Long idTipoDocumento, String telefono, String direccion,
			String observacion, Long idEstado) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.documento = documento;
		this.idTipoDocumento = idTipoDocumento;
		this.telefono = telefono;
		this.direccion = direccion;
		this.observacion = observacion;
		this.idEstado = idEstado;
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

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public Long getIdTipoDocumento() {
		return idTipoDocumento;
	}

	public void setIdTipoDocumento(Long idTipoDocumento) {
		this.idTipoDocumento = idTipoDocumento;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

}