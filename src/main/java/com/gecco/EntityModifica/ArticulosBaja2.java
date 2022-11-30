package com.gecco.EntityModifica;

public class ArticulosBaja2 {

	Long id;
	Long id_detalle_articulo;
	Long id_solicitud_baja;
	String observacion;
	Long id_opcion_baja;
	Long id_estado;
	
	public ArticulosBaja2() {
		super();
	}

	public ArticulosBaja2(Long id, Long id_detalle_articulo, Long id_solicitud_baja, String observacion,
			Long id_opcion_baja, Long id_estado) {
		super();
		this.id = id;
		this.id_detalle_articulo = id_detalle_articulo;
		this.id_solicitud_baja = id_solicitud_baja;
		this.observacion = observacion;
		this.id_opcion_baja = id_opcion_baja;
		this.id_estado = id_estado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId_detalle_articulo() {
		return id_detalle_articulo;
	}

	public void setId_detalle_articulo(Long id_detalle_articulo) {
		this.id_detalle_articulo = id_detalle_articulo;
	}

	public Long getId_solicitud_baja() {
		return id_solicitud_baja;
	}

	public void setId_solicitud_baja(Long id_solicitud_baja) {
		this.id_solicitud_baja = id_solicitud_baja;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Long getId_opcion_baja() {
		return id_opcion_baja;
	}

	public void setId_opcion_baja(Long id_opcion_baja) {
		this.id_opcion_baja = id_opcion_baja;
	}

	public Long getId_estado() {
		return id_estado;
	}

	public void setId_estado(Long id_estado) {
		this.id_estado = id_estado;
	}
	
}
