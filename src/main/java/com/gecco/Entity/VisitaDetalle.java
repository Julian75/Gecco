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
@Table(name = "visitaDetalle")
public class VisitaDetalle {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_visitas", nullable = false)
	private Visitas idVisitas;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_opcionesvisita", nullable = false)
	private OpcionesVisita idOpcionesVisita;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_elementosvisita", nullable = false)
	private ElementosVisita idElementosVisita;

	@Column(name = "descripcion", length = 30, nullable = false)
	private String descripcion;
	
	@Column(name = "ide_sitioventa", nullable = false)
    private Integer ideSitioventa;

    @Column(name = "nom_sitioventa", length = 60, nullable = false)
    private String nomSitioventa;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Visitas getIdVisitas() {
		return idVisitas;
	}

	public void setIdVisitas(Visitas idVisitas) {
		this.idVisitas = idVisitas;
	}

	public OpcionesVisita getIdOpcionesVisita() {
		return idOpcionesVisita;
	}

	public void setIdOpcionesVisita(OpcionesVisita idOpcionesVisita) {
		this.idOpcionesVisita = idOpcionesVisita;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public ElementosVisita getIdElementosVisita() {
		return idElementosVisita;
	}

	public void setIdElementosVisita(ElementosVisita idElementosVisita) {
		this.idElementosVisita = idElementosVisita;
	}

	public Integer getIdeSitioventa() {
		return ideSitioventa;
	}

	public void setIdeSitioventa(Integer ideSitioventa) {
		this.ideSitioventa = ideSitioventa;
	}

	public String getNomSitioventa() {
		return nomSitioventa;
	}

	public void setNomSitioventa(String nomSitioventa) {
		this.nomSitioventa = nomSitioventa;
	}
	
	
	
}