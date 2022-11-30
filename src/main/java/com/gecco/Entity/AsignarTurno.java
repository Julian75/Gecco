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
@Table(name = "asignarTurno")
public class AsignarTurno implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_turnos", nullable = false)
	private Turnos idTurnos;
	
	@Column(name = "id_oficina", length = 12, nullable = false)
	private int idOficina;
	

	@Column(name = "nombre_oficina", length = 60, nullable = false)
	private String nombreOficina;
	
	@Column(name = "id_sitio_venta", length = 12, nullable = false)
	private int idSitioVenta;
	
	@Column(name = "nombre_sitio_venta", length = 60, nullable = false)
	private String nombreSitioVenta;
	
	@Column(name = "porcentaje", nullable = false)
	private int porcentaje;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public Turnos getIdTurnos() {
		return idTurnos;
	}

	public void setIdTurnos(Turnos idTurnos) {
		this.idTurnos = idTurnos;
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

	public int getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(int porcentaje) {
		this.porcentaje = porcentaje;
	}
	
}
