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
@Table(name = "correoAuditoria")
public class CorreoAuditoria implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "asunto", columnDefinition = "LONGTEXT", nullable = false)
	private String asunto;
	
	@Column(name = "mensaje", columnDefinition = "LONGTEXT", nullable = false)
	private String mensaje;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_auditoria_activo", nullable = false)
	private AuditoriaActivo idAuditoriaActivo;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario_envia", nullable = false)
	private Usuario idUsuarioEnvias;
	
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

	public AuditoriaActivo getIdAuditoriaActivo() {
		return idAuditoriaActivo;
	}

	public void setIdAuditoriaActivo(AuditoriaActivo idAuditoriaActivo) {
		this.idAuditoriaActivo = idAuditoriaActivo;
	}

	public Usuario getIdUsuarioEnvias() {
		return idUsuarioEnvias;
	}

	public void setIdUsuarioEnvias(Usuario idUsuarioEnvias) {
		this.idUsuarioEnvias = idUsuarioEnvias;
	}

	public Usuario getIdUsuarioRecibe() {
		return idUsuarioRecibe;
	}

	public void setIdUsuarioRecibe(Usuario idUsuarioRecibe) {
		this.idUsuarioRecibe = idUsuarioRecibe;
	}

}
