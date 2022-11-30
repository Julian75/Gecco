package com.gecco.Entity;

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
@Table(name = "asignarTurnoVendedor")
public class AsignarTurnoVendedor {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "idOficina",nullable = false)
	private int idOficina;
	
	@Column(name = "ideSubzona",nullable = false)
	private int ideSubzona;
	
	@Column(name = "fechaInicio", nullable = false)
	private Date fechaInicio;

	@Column(name = "fechaFinal", nullable = false)
	private Date fechaFinal;
	
	@Column(name = "nombreOficina", length = 60, nullable = false)
	private String nombreOficina;
	
	@Column(name = "idSitioVenta",nullable = false)
	private int idSitioVenta;
	
	@Column(name = "nombreSitioVenta", length = 60, nullable = false)
	private String nombreSitioVenta;
	
	@Column(name = "idVendedor", nullable = false)
	private int idVendedor;
	
	@Column(name = "nombreVendedor", length = 60, nullable = false)
	private String nombreVendedor;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_turno", nullable = false)
	private Turnos idTurno;
	
	@Column(name = "estado", length = 50, nullable = false)
	private String estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getIdOficina() {
		return idOficina;
	}

	public void setIdOficina(int idOficina) {
		this.idOficina = idOficina;
	}

	public String getNombreOficina() {
		return nombreOficina;
	}

	public void setNombreOficina(String nombreOficina) {
		this.nombreOficina = nombreOficina;
	}

	public int getIdSitioVenta() {
		return idSitioVenta;
	}

	public void setIdSitioVenta(int idSitioVenta) {
		this.idSitioVenta = idSitioVenta;
	}

	public String getNombreSitioVenta() {
		return nombreSitioVenta;
	}

	public void setNombreSitioVenta(String nombreSitioVenta) {
		this.nombreSitioVenta = nombreSitioVenta;
	}

	public int getIdVendedor() {
		return idVendedor;
	}

	public void setIdVendedor(int idVendedor) {
		this.idVendedor = idVendedor;
	}

	public String getNombreVendedor() {
		return nombreVendedor;
	}

	public void setNombreVendedor(String nombreVendedor) {
		this.nombreVendedor = nombreVendedor;
	}
	
	public Date getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public Date getFechaFinal() {
		return fechaFinal;
	}

	public void setFechaFinal(Date fechaFinal) {
		this.fechaFinal = fechaFinal;
	}

	public Turnos getIdTurno() {
		return idTurno;
	}

	public void setIdTurno(Turnos idTurno) {
		this.idTurno = idTurno;
	}
	
	public int getIdeSubzona() {
		return ideSubzona;
	}

	public void setIdeSubzona(int ideSubzona) {
		this.ideSubzona = ideSubzona;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
}
