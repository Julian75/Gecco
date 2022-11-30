package com.gecco.EntityModifica;

public class ClienteSC2 {
	
	Long id;
	String nombre;
	String apellido;
	String correo;
	String telefono;
	String documento;
	Long idTipoDocumento;
	
	public ClienteSC2() {
		super();
	}
	
	public ClienteSC2(Long id, String nombre, String apellido, String correo, String telefono, String documento,
			Long idTipoDocumento) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.correo = correo;
		this.telefono = telefono;
		this.documento = documento;
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
	
	public String getApellido() {
		return apellido;
	}
	
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	
	public String getCorreo() {
		return correo;
	}
	
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	
	public String getTelefono() {
		return telefono;
	}
	
	public void setTelefono(String telefono) {
		this.telefono = telefono;
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
	
	
}