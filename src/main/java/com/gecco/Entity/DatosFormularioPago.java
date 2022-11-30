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
@Table(name = "DatosFormularioPago")
public class DatosFormularioPago { 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha_sorteo", nullable = false)
	private Date fechaSorteo;
	
	@Column(name = "serie_preimpresa", columnDefinition = "LONGTEXT", nullable = false)
	private String seriePreImpresa;
	
	@Column(name = "serie_impresa", columnDefinition = "LONGTEXT", nullable = false)
	private String serieImpresa;
	
	@Column(name = "colilla_impresa", columnDefinition = "LONGTEXT", nullable = false)
	private String colillaImpresa;
	
	@Column(name = "colilla_preimpresa", columnDefinition = "LONGTEXT", nullable = false)
	private String colillaPreImpresa;
	
	@Column(name = "serie_codigo_venta", nullable = false)
	private int serieCodigoVenta;
	
	@Column(name = "nombre_sorteo_loteria", columnDefinition = "LONGTEXT", nullable = false)
	private String nombreSorteoLoteria;
	
	@Column(name = "total_formulario",columnDefinition = "LONGTEXT", nullable = false)
	private String totalFormulario;
	
	@Column(name = "total_ganado_bruto", columnDefinition = "LONGTEXT", nullable = false)
	private String totalGanadoBruto;
	
	@Column(name = "cedula_colocador", columnDefinition = "LONGTEXT", nullable = false)
	private String cedulaColocador;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_clientes_autorizacion_pago", nullable = false)
	private ClientesAutorizacionPago idClientesAutorizacionPago;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFechaSorteo() {
		return fechaSorteo;
	}

	public void setFechaSorteo(Date fechaSorteo) {
		this.fechaSorteo = fechaSorteo;
	}

	public String getSeriePreImpresa() {
		return seriePreImpresa;
	}

	public void setSeriePreImpresa(String seriePreImpresa) {
		this.seriePreImpresa = seriePreImpresa;
	}

	public String getSerieImpresa() {
		return serieImpresa;
	}

	public void setSerieImpresa(String serieImpresa) {
		this.serieImpresa = serieImpresa;
	}

	public String getColillaImpresa() {
		return colillaImpresa;
	}

	public void setColillaImpresa(String colillaImpresa) {
		this.colillaImpresa = colillaImpresa;
	}

	public String getColillaPreImpresa() {
		return colillaPreImpresa;
	}

	public void setColillaPreImpresa(String colillaPreImpresa) {
		this.colillaPreImpresa = colillaPreImpresa;
	}

	public int getSerieCodigoVenta() {
		return serieCodigoVenta;
	}

	public void setSerieCodigoVenta(int serieCodigoVenta) {
		this.serieCodigoVenta = serieCodigoVenta;
	}

	public String getNombreSorteoLoteria() {
		return nombreSorteoLoteria;
	}

	public void setNombreSorteoLoteria(String nombreSorteoLoteria) {
		this.nombreSorteoLoteria = nombreSorteoLoteria;
	}

	public String getTotalFormulario() {
		return totalFormulario;
	}

	public void setTotalFormulario(String totalFormulario) {
		this.totalFormulario = totalFormulario;
	}

	public String getTotalGanadoBruto() {
		return totalGanadoBruto;
	}

	public void setTotalGanadoBruto(String totalGanadoBruto) {
		this.totalGanadoBruto = totalGanadoBruto;
	}

	public String getCedulaColocador() {
		return cedulaColocador;
	}

	public void setCedulaColocador(String cedulaColocador) {
		this.cedulaColocador = cedulaColocador;
	}

	public ClientesAutorizacionPago getIdClientesAutorizacionPago() {
		return idClientesAutorizacionPago;
	}

	public void setIdClientesAutorizacionPago(ClientesAutorizacionPago idClientesAutorizacionPago) {
		this.idClientesAutorizacionPago = idClientesAutorizacionPago;
	}
}
