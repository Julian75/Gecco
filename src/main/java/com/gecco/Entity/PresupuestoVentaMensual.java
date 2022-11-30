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
@Table(name = "presupuestoVentaMensual")
public class PresupuestoVentaMensual {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombreSitioVenta", length = 30, nullable = false)
	private String nombreSitioVenta;
	
	@Column(name = "idSitioVenta",nullable = false)
	private int idSitioVenta;
	
	@Column(name = "valorPresupuesto", nullable = false)
	private int valorPresupuesto;
	
	//@ManyToOne(fetch = FetchType.EAGER, optional = false)
	//@JoinColumn(name = "id_producto", nullable = false)
	//private Producto idProducto;
	
	@Column(name = "mes", nullable = false)
	private Date mes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreSitioVenta() {
		return nombreSitioVenta;
	}

	public void setNombreSitioVenta(String nombreSitioVenta) {
		this.nombreSitioVenta = nombreSitioVenta;
	}

	public int getIdSitioVenta() {
		return idSitioVenta;
	}

	public void setIdSitioVenta(int idSitioVenta) {
		this.idSitioVenta = idSitioVenta;
	}

	public int getValorPresupuesto() {
		return valorPresupuesto;
	}

	public void setValorPresupuesto(int valorPresupuesto) {
		this.valorPresupuesto = valorPresupuesto;
	}

	public Date getMes() {
		return mes;
	}

	public void setMes(Date mes) {
		this.mes = mes;
	}

}
