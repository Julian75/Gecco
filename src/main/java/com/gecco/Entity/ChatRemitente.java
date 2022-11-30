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
@Table(name = "ChatRemitente")
public class ChatRemitente implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "asunto", length = 500, nullable = false)
	private String asunto;
	
	@Column(name = "mensaje", columnDefinition = "LONGTEXT", nullable = false)
	private String mensaje;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitud_sc", nullable = false)
	private SolicitudSC idSolicitudSC;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario_envia", nullable = false)
	private Usuario idUsuarioEnvia;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario_recibe", nullable = false)
	private Usuario idUsuarioRecibe;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public SolicitudSC getIdSolicitudSC() {
		return idSolicitudSC;
	}

	public void setIdSolicitudSC(SolicitudSC idSolicitudSC) {
		this.idSolicitudSC = idSolicitudSC;
	}

	public Usuario getIdUsuarioEnvia() {
		return idUsuarioEnvia;
	}

	public void setIdUsuarioEnvia(Usuario idUsuarioEnvia) {
		this.idUsuarioEnvia = idUsuarioEnvia;
	}

	public Usuario getIdUsuarioRecibe() {
		return idUsuarioRecibe;
	}

	public void setIdUsuarioRecibe(Usuario idUsuarioRecibe) {
		this.idUsuarioRecibe = idUsuarioRecibe;
	}
	
	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	
}
