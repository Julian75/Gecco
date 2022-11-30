package com.gecco.EntityModifica;

public class AuditoriaActivo2 {

	Long id;
	String estado;
	Long idAsignacionPuntoVentaArticulo;
	Long idAuditoriaActivoRegistro;
	
	public AuditoriaActivo2() {
		super();
	}
	
	public AuditoriaActivo2(Long id, String estado, Long idAsignacionPuntoVentaArticulo,
			Long idAuditoriaActivoRegistro) {
		super();
		this.id = id;
		this.estado = estado;
		this.idAsignacionPuntoVentaArticulo = idAsignacionPuntoVentaArticulo;
		this.idAuditoriaActivoRegistro = idAuditoriaActivoRegistro;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Long getIdAsignacionPuntoVentaArticulo() {
		return idAsignacionPuntoVentaArticulo;
	}

	public void setIdAsignacionPuntoVentaArticulo(Long idAsignacionPuntoVentaArticulo) {
		this.idAsignacionPuntoVentaArticulo = idAsignacionPuntoVentaArticulo;
	}

	public Long getIdAuditoriaActivoRegistro() {
		return idAuditoriaActivoRegistro;
	}

	public void setIdAuditoriaActivoRegistro(Long idAuditoriaActivoRegistro) {
		this.idAuditoriaActivoRegistro = idAuditoriaActivoRegistro;
	}
	
}
