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
@Table(name = "raspas")
public class Raspas implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fec_venta", nullable = false)
	private Date fecVenta;
	
	@Column(name = "fec_pago", nullable = false)
	private Date fecPago;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "estado", nullable = false)
	private Integer estado;

	@Column(name = "ide_oficina", nullable = false)
	private Integer ideOficina;
	
	@Column(name = "raspa", length = 50, nullable = false)
	private String raspa;
	
	@Column(name = "emision_raspa", length = 50, nullable = false)
	private String emision_raspa;
	
	@Column(name = "nombres", length = 50, nullable = false)
	private String nombres;
	
	@Column(name = "apellido1", length = 50, nullable = false)
	private String apellido1;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecVenta() {
		return fecVenta;
	}

	public void setFecVenta(Date fecVenta) {
		this.fecVenta = fecVenta;
	}

	public Date getFecPago() {
		return fecPago;
	}

	public void setFecPago(Date fecPago) {
		this.fecPago = fecPago;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}

	public Integer getIdeOficina() {
		return ideOficina;
	}

	public void setIdeOficina(Integer ideOficina) {
		this.ideOficina = ideOficina;
	}

	public String getRaspa() {
		return raspa;
	}

	public void setRaspa(String raspa) {
		this.raspa = raspa;
	}

	public String getEmision_raspa() {
		return emision_raspa;
	}

	public void setEmision_raspa(String emision_raspa) {
		this.emision_raspa = emision_raspa;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellido1() {
		return apellido1;
	}

	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

}
