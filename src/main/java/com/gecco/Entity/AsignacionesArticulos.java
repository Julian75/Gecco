package com.gecco.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "asignacionesArticulos")
public class AsignacionesArticulos implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_asignaciones_procesos", nullable = false)
	private AsignacionesProcesos idAsignacionesProcesos;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_detalle_articulo", nullable = false)
	private DetalleArticulo idDetalleArticulo;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "idEstado", nullable = false)
	private Estado idEstado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AsignacionesProcesos getIdAsignacionesProcesos() {
		return idAsignacionesProcesos;
	}

	public void setIdAsignacionesProcesos(AsignacionesProcesos idAsignacionesProcesos) {
		this.idAsignacionesProcesos = idAsignacionesProcesos;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public DetalleArticulo getIdDetalleArticulo() {
		return idDetalleArticulo;
	}

	public void setIdDetalleArticulo(DetalleArticulo idDetalleArticulo) {
		this.idDetalleArticulo = idDetalleArticulo;
	}
	
}
