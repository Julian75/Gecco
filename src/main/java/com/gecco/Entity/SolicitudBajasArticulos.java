package com.gecco.Entity;

import java.io.Serializable;
import java.sql.Date;

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
@Table(name = "solicitudBajasArticulos")
public class SolicitudBajasArticulos implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "usuario_autorizacion", nullable = false)
	private int usuarioAutorizacion;
	
	@Column(name = "usuario_confirmacion", nullable = false)
	private int usuarioConfirmacion;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;
	
	@Column(name = "estado_contabilidad", length = 500, nullable = false)
	private String estadoContabilidad;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public int getUsuarioAutorizacion() {
		return usuarioAutorizacion;
	}

	public void setUsuarioAutorizacion(int usuarioAutorizacion) {
		this.usuarioAutorizacion = usuarioAutorizacion;
	}

	public int getUsuarioConfirmacion() {
		return usuarioConfirmacion;
	}

	public void setUsuarioConfirmacion(int usuarioConfirmacion) {
		this.usuarioConfirmacion = usuarioConfirmacion;
	}

	public String getEstadoContabilidad() {
		return estadoContabilidad;
	}

	public void setEstadoContabilidad(String estadoContabilidad) {
		this.estadoContabilidad = estadoContabilidad;
	}

}
