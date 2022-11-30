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
@Table(name = "ordenCompra")
public class OrdenCompra implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "anticipo_porcentaje", nullable = false)
	private Double anticipoPorcentaje;
	
	@Column(name = "valor_anticipo", nullable = false)
	private Double valorAnticipo;
	
	@Column(name = "subtotal", nullable = false)
	private Double subtotal;
	
	@Column(name = "descuento", nullable = false)
	private Double descuento;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitud", nullable = false)
	private Solicitud idSolicitud;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_proveedor", nullable = false)
	private Proveedor idProveedor;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getAnticipoPorcentaje() {
		return anticipoPorcentaje;
	}

	public void setAnticipoPorcentaje(Double anticipoPorcentaje) {
		this.anticipoPorcentaje = anticipoPorcentaje;
	}

	public Double getValorAnticipo() {
		return valorAnticipo;
	}

	public void setValorAnticipo(Double valorAnticipo) {
		this.valorAnticipo = valorAnticipo;
	}

	public Solicitud getIdSolicitud() {
		return idSolicitud;
	}

	public void setIdSolicitud(Solicitud idSolicitud) {
		this.idSolicitud = idSolicitud;
	}

	public Proveedor getIdProveedor() {
		return idProveedor;
	}

	public void setIdProveedor(Proveedor idProveedor) {
		this.idProveedor = idProveedor;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public Double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}

	public Double getDescuento() {
		return descuento;
	}

	public void setDescuento(Double descuento) {
		this.descuento = descuento;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}