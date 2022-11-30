package com.gecco.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ArticulosBaja")
public class ArticulosBaja implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_detalle_articulo", nullable = false)
	private DetalleArticulo idDetalleArticulo;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitud_baja", nullable = false)
	private SolicitudBajasArticulos idSolicitudBaja;

	@Column(name = "observacion", length = 550, nullable = false)
	private String observacion;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_opcion_baja", nullable = false)
	private OpcionArticuloBaja idOpcionBaja;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DetalleArticulo getIdDetalleArticulo() {
		return idDetalleArticulo;
	}

	public void setIdDetalleArticulo(DetalleArticulo idDetalleArticulo) {
		this.idDetalleArticulo = idDetalleArticulo;
	}

	public SolicitudBajasArticulos getIdSolicitudBaja() {
		return idSolicitudBaja;
	}

	public void setIdSolicitudBaja(SolicitudBajasArticulos idSolicitudBaja) {
		this.idSolicitudBaja = idSolicitudBaja;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public OpcionArticuloBaja getIdOpcionBaja() {
		return idOpcionBaja;
	}

	public void setIdOpcionBaja(OpcionArticuloBaja idOpcionBaja) {
		this.idOpcionBaja = idOpcionBaja;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}
	
}
