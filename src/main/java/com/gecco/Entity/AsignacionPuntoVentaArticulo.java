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
@Table(name = "asignacionPuntoVentaArticulo")
public class AsignacionPuntoVentaArticulo implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_asignaciones_articulos", nullable = false)
	private AsignacionesArticulos idAsignacionesArticulos;

	@Column(name = "id_oficina", length = 12, nullable = false)
	private int idOficina;

	@Column(name = "id_sitio_venta", length = 12, nullable = false)
	private int idSitioVenta;
	
	@Column(name = "cantidad", length = 12, nullable = false)
	private int cantidad;
	
	@Column(name = "nombre_oficina", length = 60, nullable = false)
	private String nombreOficina;
	
	@Column(name = "nombre_sitio_venta", length = 60, nullable = false)
	private String nombreSitioVenta;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AsignacionesArticulos getIdAsignacionesArticulos() {
		return idAsignacionesArticulos;
	}

	public void setIdAsignacionesArticulos(AsignacionesArticulos idAsignacionesArticulos) {
		this.idAsignacionesArticulos = idAsignacionesArticulos;
	}

	public int getIdOficina() {
		return idOficina;
	}

	public void setIdOficina(int idOficina) {
		this.idOficina = idOficina;
	}

	public int getIdSitioVenta() {
		return idSitioVenta;
	}

	public void setIdSitioVenta(int idSitioVenta) {
		this.idSitioVenta = idSitioVenta;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public String getNombreOficina() {
		return nombreOficina;
	}

	public void setNombreOficina(String nombreOficina) {
		this.nombreOficina = nombreOficina;
	}

	public String getNombreSitioVenta() {
		return nombreSitioVenta;
	}

	public void setNombreSitioVenta(String nombreSitioVenta) {
		this.nombreSitioVenta = nombreSitioVenta;
	}
	
}