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
@Table(name = "archivoSolicitudAutorizacionPago")
public class ArchivoSolicitudAutorizacionPago implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombreArchivo", length = 250, nullable = false)
	private String nombreArchivo;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitud_autorizacion_pago", nullable = false)
	private SolicitudAutorizacionPago idSolicitudAutorizacionPago; 
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreArchivo() {
		return nombreArchivo;
	}

	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}

	public SolicitudAutorizacionPago getIdSolicitudAutorizacionPago() {
		return idSolicitudAutorizacionPago;
	}

	public void setIdSolicitudAutorizacionPago(SolicitudAutorizacionPago idSolicitudAutorizacionPago) {
		this.idSolicitudAutorizacionPago = idSolicitudAutorizacionPago;
	}

	public Usuario getIdUsuario() { 
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}
}
