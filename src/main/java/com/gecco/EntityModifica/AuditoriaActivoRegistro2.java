package com.gecco.EntityModifica;

public class AuditoriaActivoRegistro2 {
	
	Long id;
	String fecha;
	Long idUsuario;
	
	public AuditoriaActivoRegistro2() {
		super();
	}

	public AuditoriaActivoRegistro2(Long id, String fecha, Long idUsuario) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.idUsuario = idUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

}
