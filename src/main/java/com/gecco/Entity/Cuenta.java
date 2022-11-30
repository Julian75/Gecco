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
@Table(name = "cuenta")
public class Cuenta implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "descripcion", columnDefinition = "LONGTEXT", nullable = false)
	private String descripcion;
	
	@Column(name = "codigo", unique=true, nullable = false)
	private int codigo;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_jerarquia_cuentas", nullable = false)
	private JerarquiaCuentas idJerarquiaCuentas;

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

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public JerarquiaCuentas getIdJerarquiaCuentas() {
		return idJerarquiaCuentas;
	}

	public void setIdJerarquiaCuentas(JerarquiaCuentas idJerarquiaCuentas) {
		this.idJerarquiaCuentas = idJerarquiaCuentas;
	}
}
