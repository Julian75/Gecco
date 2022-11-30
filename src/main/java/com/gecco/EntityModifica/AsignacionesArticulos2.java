package com.gecco.EntityModifica;

public class AsignacionesArticulos2 {

	Long id;
	Long idAsignacionesProcesos;
	Long idDetalleArticulo;
	Long idEstado;
	
	public AsignacionesArticulos2() {
		super();
	}

	public AsignacionesArticulos2(Long id, Long idAsignacionesProcesos, Long idDetalleArticulo, Long idEstado) {
		super();
		this.id = id;
		this.idAsignacionesProcesos = idAsignacionesProcesos;
		this.idDetalleArticulo = idDetalleArticulo;
		this.idEstado = idEstado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdAsignacionesProcesos() {
		return idAsignacionesProcesos;
	}

	public void setIdAsignacionesProcesos(Long idAsignacionesProcesos) {
		this.idAsignacionesProcesos = idAsignacionesProcesos;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdDetalleArticulo() {
		return idDetalleArticulo;
	}

	public void setIdDetalleArticulo(Long idDetalleArticulo) {
		this.idDetalleArticulo = idDetalleArticulo;
	}
	
}
