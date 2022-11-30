package com.gecco.Entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "recordatorio")
public class Recordatorio implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "descripcion", columnDefinition = "LONGTEXT", nullable = false)
	private String descripcion;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "hora", nullable = false)
	private String hora;
	
	@Column(name = "envio", length = 30, nullable = false)
	private String envio;
	
	@Column(name = "cumplimiento", length = 30, nullable = false)
	private String cumplimiento;
	
	@Column(name = "tipo_envio", length = 30, nullable = false)
	private String tipoEnvio;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getEnvio() {
		return envio;
	}

	public void setEnvio(String envio) {
		this.envio = envio;
	}

	public String getTipoEnvio() {
		return tipoEnvio;
	}

	public void setTipoEnvio(String tipoEnvio) {
		this.tipoEnvio = tipoEnvio;
	}

	public String getCumplimiento() {
		return cumplimiento;
	}

	public void setCumplimiento(String cumplimiento) {
		this.cumplimiento = cumplimiento;
	}
	
}
