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
@Table(name = "soporte_sc")
public class SoporteSC implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "descripcion", length = 200, nullable = false)
	private String Descripcion;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitud_sc", nullable = false)
	private SolicitudSC idSolicitudSC;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_historial", nullable = false)
	private HistorialSolicitudes idHistorial;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return Descripcion;
	}

	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}

	public SolicitudSC getIdSolicitudSC() {
		return idSolicitudSC;
	}

	public void setIdSolicitudSC(SolicitudSC idSolicitudSC) {
		this.idSolicitudSC = idSolicitudSC;
	}

	public HistorialSolicitudes getIdHistorial() {
		return idHistorial;
	}

	public void setIdHistorial(HistorialSolicitudes idHistorial) {
		this.idHistorial = idHistorial;
	}
	
}