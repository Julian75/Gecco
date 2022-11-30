package com.gecco.Entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "asignacionesActivosPendiente")
public class AsignacionesActivosPendiente {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario_asignacion_pendiente", nullable = false)
	private Usuario idUsuarioAsignacionPendiente;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_detalle_activo", nullable = false)
	private DetalleArticulo idDetalleActivo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Usuario getIdUsuarioAsignacionPendiente() {
		return idUsuarioAsignacionPendiente;
	}

	public void setIdUsuarioAsignacionPendiente(Usuario idUsuarioAsignacionPendiente) {
		this.idUsuarioAsignacionPendiente = idUsuarioAsignacionPendiente;
	}

	public DetalleArticulo getIdDetalleActivo() {
		return idDetalleActivo;
	}

	public void setIdDetalleActivo(DetalleArticulo idDetalleActivo) {
		this.idDetalleActivo = idDetalleActivo;
	}

}
