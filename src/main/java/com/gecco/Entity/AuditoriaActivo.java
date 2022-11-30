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
@Table(name = "auditoriaActivo")
public class AuditoriaActivo implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "estado", columnDefinition = "LONGTEXT", nullable = false)
	private String estado;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_asignacion_punto_venta_articulo", nullable = false)
	private AsignacionPuntoVentaArticulo idAsignacionPuntoVentaArticulo;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_auditoria_activo_registro", nullable = false)
	private AuditoriaActivoRegistro idAuditoriaActivoRegistro;

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

	public AsignacionPuntoVentaArticulo getIdAsignacionPuntoVentaArticulo() {
		return idAsignacionPuntoVentaArticulo;
	}

	public void setIdAsignacionPuntoVentaArticulo(AsignacionPuntoVentaArticulo idAsignacionPuntoVentaArticulo) {
		this.idAsignacionPuntoVentaArticulo = idAsignacionPuntoVentaArticulo;
	}

	public AuditoriaActivoRegistro getIdAuditoriaActivoRegistro() {
		return idAuditoriaActivoRegistro;
	}

	public void setIdAuditoriaActivoRegistro(AuditoriaActivoRegistro idAuditoriaActivoRegistro) {
		this.idAuditoriaActivoRegistro = idAuditoriaActivoRegistro;
	}
}
