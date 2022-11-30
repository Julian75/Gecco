package com.gecco.EntityModifica;

public class Usuario2 {
	
	Long id;
	String nombre;
	String apellido;
	String correo;
	Integer documento;
	String password;
	Integer ideOficina;
	Integer ideSubzona;
	Long idEstado;
	Long idTipoDocumento;
	Long idRol;
	
	public Usuario2() {
		super();
	}

	public Usuario2(Long id, String nombre, String apellido, String correo, Integer documento, String password,
			Integer ideOficina, Integer ideSubzona, Long idEstado, Long idTipoDocumento, Long idRol) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.correo = correo;
		this.documento = documento;
		this.password = password;
		this.ideOficina = ideOficina;
		this.ideSubzona = ideSubzona;
		this.idEstado = idEstado;
		this.idTipoDocumento = idTipoDocumento;
		this.idRol = idRol;
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

	public Integer getDocumento() {
		return documento;
	}

	public void setDocumento(Integer documento) {
		this.documento = documento;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getIdeOficina() {
		return ideOficina;
	}

	public void setIdeOficina(Integer ideOficina) {
		this.ideOficina = ideOficina;
	}

	public Integer getIdeSubzona() {
		return ideSubzona;
	}

	public void setIdeSubzona(Integer ideSubzona) {
		this.ideSubzona = ideSubzona;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdTipoDocumento() {
		return idTipoDocumento;
	}

	public void setIdTipoDocumento(Long idTipoDocumento) {
		this.idTipoDocumento = idTipoDocumento;
	}

	public Long getIdRol() {
		return idRol;
	}

	public void setIdRol(Long idRol) {
		this.idRol = idRol;
	}
	
}