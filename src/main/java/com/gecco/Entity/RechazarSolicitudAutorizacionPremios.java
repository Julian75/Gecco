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
@Table(name = "rechazo_solicitud_autorizacion_premios")
public class RechazarSolicitudAutorizacionPremios implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "comentario", columnDefinition = "LONGTEXT", nullable = false)
	private String comentario;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitud_autorizacion_pago", nullable = false)
	private SolicitudAutorizacionPago idSolicitudAutorizacionPremios;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario; 

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public SolicitudAutorizacionPago getIdSolicitudAutorizacionPremios() {
		return idSolicitudAutorizacionPremios;
	}

	public void setIdSolicitudAutorizacionPremios(SolicitudAutorizacionPago idSolicitudAutorizacionPremios) {
		this.idSolicitudAutorizacionPremios = idSolicitudAutorizacionPremios;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}
}
