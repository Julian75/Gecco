package com.gecco.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gecco.EntityModifica.Area2;
import com.gecco.EntityModifica.Articulos2;
import com.gecco.EntityModifica.ArticulosBaja2;
import com.gecco.EntityModifica.AsignacionPuntoVentaArticulo2;
import com.gecco.EntityModifica.AsignacionUsuarioPQRS2;
import com.gecco.EntityModifica.AsignacionesArticulos2;
import com.gecco.EntityModifica.AsignacionesProcesos2;
import com.gecco.EntityModifica.AsignarTurno2;
import com.gecco.EntityModifica.AsignarTurnoVendedor2;
import com.gecco.EntityModifica.Categoria2;
import com.gecco.EntityModifica.ClienteAutorizacionPago2;
import com.gecco.EntityModifica.ClienteSC2;
import com.gecco.EntityModifica.Compras2;
import com.gecco.EntityModifica.Configuracion2;
import com.gecco.EntityModifica.Cotizacion2;
import com.gecco.EntityModifica.CotizacionPdf2;
import com.gecco.EntityModifica.Cuenta2;
import com.gecco.EntityModifica.DatosFormularioPago2;
import com.gecco.EntityModifica.DetalleArticulo2;
import com.gecco.EntityModifica.DetalleSolicitud2;
import com.gecco.EntityModifica.ElementosVisita2;
import com.gecco.EntityModifica.EliminacionTurnVen2;
import com.gecco.EntityModifica.EscalaSolicitudes2;
import com.gecco.EntityModifica.GestionProceso2;
import com.gecco.EntityModifica.Historial2;
import com.gecco.EntityModifica.HistorialArticulo2;
import com.gecco.EntityModifica.IngresoPersonalEmpresa2;
import com.gecco.EntityModifica.Inventario2;
import com.gecco.EntityModifica.Jerarquia2;
import com.gecco.EntityModifica.JerarquiaCuentas2;
import com.gecco.EntityModifica.LibroMayor2;
import com.gecco.EntityModifica.MatrizNecesidad2;
import com.gecco.EntityModifica.MatrizNecesidadDetalle2;
import com.gecco.EntityModifica.MediosRadiacion2;
import com.gecco.EntityModifica.Modulo2;
import com.gecco.EntityModifica.MotivoAutorizacionPago2;
import com.gecco.EntityModifica.MotivoSolicitud2;
import com.gecco.EntityModifica.MovimientoComprasInventario2;
import com.gecco.EntityModifica.OpcionArticuloBaja2;
import com.gecco.EntityModifica.OpcionesVisita2;
import com.gecco.EntityModifica.OrdenCompra2;
import com.gecco.EntityModifica.PeriodoEjecucion2;
import com.gecco.EntityModifica.PorcentajePresupuesto2;
import com.gecco.EntityModifica.PresupuestoContable2;
import com.gecco.EntityModifica.Proceso2;
import com.gecco.EntityModifica.Proveedor2;
import com.gecco.EntityModifica.Rol2;
import com.gecco.EntityModifica.Sede2;
import com.gecco.EntityModifica.Solicitud2;
import com.gecco.EntityModifica.SolicitudAutorizacionPago2;
import com.gecco.EntityModifica.SolicitudBajasArticulos2;
import com.gecco.EntityModifica.SolicitudSC2;
import com.gecco.EntityModifica.SubProceso2;
import com.gecco.EntityModifica.TipoActivo2;
import com.gecco.EntityModifica.TipoDocumento2;
import com.gecco.EntityModifica.TipoNecesidad2;
import com.gecco.EntityModifica.TipoNovedades2;
import com.gecco.EntityModifica.TipoServicio2;
import com.gecco.EntityModifica.TipoTurno2;
import com.gecco.EntityModifica.TiposProcesos2;
import com.gecco.EntityModifica.Turnos2;
import com.gecco.EntityModifica.Usuario2;
import com.gecco.Service.IModificarService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Modificar")
public class ModificarController {

	@Autowired IModificarService modificarService;
	
	@PutMapping("/AsignarTurnoVendedor/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody AsignarTurnoVendedor2 confi) {
		AsignarTurnoVendedor2 _tutorial = modificarService.findByIdVendedor(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdOficina(confi.getIdOficina());
	      _tutorial.setIdSitioVenta(confi.getIdSitioVenta());
	      _tutorial.setIdVendedor(confi.getIdVendedor());
	      _tutorial.setNombreOficina(confi.getNombreOficina());
	      _tutorial.setNombreSitioVenta(confi.getNombreSitioVenta());
	      _tutorial.setNombreVendedor(confi.getNombreVendedor());
	      _tutorial.setFechaFinal(confi.getFechaFinal());
	      _tutorial.setFechaInicio(confi.getFechaInicio());
	      _tutorial.setIdTurno(confi.getIdTurno());
	      _tutorial.setIdeSubzona(confi.getIdeSubzona());
	      _tutorial.setEstado(confi.getEstado());
	      modificarService.modificarAsignarTurnoVendedor(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Eliminacion/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody EliminacionTurnVen2 confi) {
		EliminacionTurnVen2 _tutorial = modificarService.findByIdEliminacion(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setObservacion(confi.getObservacion());
	      _tutorial.setIdAsignarTurnoVendedor(confi.getIdAsignarTurnoVendedor());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      _tutorial.setEstado(confi.getEstado());
	      modificarService.modificarEliminacion(confi);
	    } 
	    return null;
	  }

	@PutMapping("/Usuario/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Usuario2 confi) {
		Usuario2 _tutorial = modificarService.findByIdUsuario(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setApellido(confi.getApellido());
	      _tutorial.setCorreo(confi.getCorreo());
	      _tutorial.setDocumento(confi.getDocumento());
	      _tutorial.setNombre(confi.getNombre());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdRol(confi.getIdRol());
	      _tutorial.setIdTipoDocumento(confi.getIdTipoDocumento());
	      _tutorial.setPassword(confi.getPassword());
	      _tutorial.setIdeOficina(confi.getIdeOficina());
	      _tutorial.setIdeSubzona(confi.getIdeSubzona());
	      modificarService.modificarUsuario(confi);
	    } 
	    return null;
	  }
	
	@PutMapping("/Articulos/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Articulos2 confi) {
		Articulos2 _tutorial = modificarService.findByIdArticulos(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdCategoria(confi.getIdCategoria());
	      modificarService.modificarArticulos(confi);
	    } 
	    return null;
	  }
	
	@PutMapping("/Categoria/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Categoria2 confi) {
		Categoria2 _tutorial = modificarService.findByIdCategorias(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarCategorias(confi);
	    } 
	    return null;
	  }
	
	@PutMapping("/Cotizacion/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Cotizacion2 confi) {
		Cotizacion2 _tutorial = modificarService.findByIdCotizacion(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdSolicitud(confi.getIdSolicitud());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarCotizacion(confi);
	    } 
	    return null;
	  }
	
	@PutMapping("/CotizacionPdf/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody CotizacionPdf2 confi) {
		CotizacionPdf2 _tutorial = modificarService.findByIdCotizacionPdf(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setNombrePdf(confi.getNombrePdf());
	      _tutorial.setIdCotizacion(confi.getIdCotizacion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarCotizacionPdf(confi);
	    }
	    return null;
	  }
	
	@PutMapping("/DetalleSolicitud/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody DetalleSolicitud2 confi) {
		DetalleSolicitud2 _tutorial = modificarService.findByIdDetalleSolicitud(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setCantidad(confi.getCantidad());
	      _tutorial.setObservacion(confi.getObservacion());
	      _tutorial.setValorTotal(confi.getValorTotal());
	      _tutorial.setValorUnitario(confi.getValorUnitario());
	      _tutorial.setIdArticulos(confi.getIdArticulos());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdSolicitud(confi.getIdSolicitud());
	      modificarService.modificarDetalleSolicitud(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Solicitud/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Solicitud2 confi) {
		Solicitud2 _tutorial = modificarService.findByIdSolicitud(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarSolicitud(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Proveedor/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Proveedor2 confi) {
		Proveedor2 _tutorial = modificarService.findByIdProveedor(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDireccion(confi.getDireccion());
	      _tutorial.setDocumento(confi.getDocumento());
	      _tutorial.setNombre(confi.getNombre());
	      _tutorial.setObservacion(confi.getObservacion());
	      _tutorial.setTelefono(confi.getTelefono());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdTipoDocumento(confi.getIdTipoDocumento());
	      modificarService.modificarProveedor(confi);
	    }
	    return null;
	  }
	
	@PutMapping("/GestionProceso/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody GestionProceso2 confi) {
		GestionProceso2 _tutorial = modificarService.findByIdGestionProceso(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setComentario(confi.getComentario());
	      _tutorial.setIdDetalleSolicitud(confi.getIdDetalleSolicitud());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      _tutorial.setIdProceso(confi.getIdProceso());
	      modificarService.modificarGestionProceso(confi);
	    }
	    return null;
	  }
	
	@PutMapping("/OrdenCompra/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody OrdenCompra2 confi) {
		OrdenCompra2 _tutorial = modificarService.findByIdOrdenCompra(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setAnticipoPorcentaje(confi.getAnticipoPorcentaje());
	      _tutorial.setDescuento(confi.getDescuento());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdProveedor(confi.getIdProveedor());
	      _tutorial.setIdSolicitud(confi.getIdSolicitud());
	      _tutorial.setSubtotal(confi.getSubtotal());
	      _tutorial.setValorAnticipo(confi.getValorAnticipo());
	      modificarService.modificarOrdenCompra(confi);
	    } 
	    return null;
	  }
	
	@PutMapping("/Proceso/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Proceso2 confi) {
		Proceso2 _tutorial = modificarService.findByIdProceso(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdCategoria(confi.getIdCategoria());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarProceso(confi);
	    } 
	    return null;
	  }
	
	@PutMapping("/AsignarTurnoPuntoVenta/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody AsignarTurno2 confi) {
		AsignarTurno2 _tutorial = modificarService.findByIdAsignarTurno(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdTurnos(confi.getIdTurnos());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdOficina(confi.getIdOficina());
	      _tutorial.setNombreOficina(confi.getNombreOficina());
	      _tutorial.setIdSitioVenta(confi.getIdSitioVenta());
	      _tutorial.setPorcentaje(confi.getPorcentaje());
	      _tutorial.setNombreSitioVenta(confi.getNombreSitioVenta());
	      modificarService.modificarAsignarTurno(confi);
	    }
		return null;
	  }
	
	@PutMapping("/HistorialSC/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Historial2 confi) {
		Historial2 _tutorial = modificarService.findByIdHistorialSC(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setId_solicitud_sc(confi.getId_solicitud_sc());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setObservacion(confi.getObservacion());
	      modificarService.modificarHistorialSC(confi);
	    }
		return null;
	  }
	
	@PutMapping("/SolicitudSC/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody SolicitudSC2 confi) {
		SolicitudSC2 _tutorial = modificarService.findByIdSolicitudSC(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdEscalaSolicitudes(confi.getIdEscalaSolicitudes());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdMotivoSolicitud(confi.getIdMotivoSolicitud());
	      _tutorial.setIdTipoServicio(confi.getIdTipoServicio());
	      _tutorial.setIdClienteSC(confi.getIdClienteSC());
	      _tutorial.setAuxiliarRadicacion(confi.getAuxiliarRadicacion());
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setIncidente(confi.getIncidente());
	      _tutorial.setMedioRadicacion(confi.getMedioRadicacion());
	      _tutorial.setMunicipio(confi.getMunicipio());
	      _tutorial.setVence(confi.getVence());
	      _tutorial.setProrroga(confi.getProrroga());
	      _tutorial.setPersonaAfectada(confi.getPersonaAfectada());
	      _tutorial.setPersonaInvolucrada(confi.getPersonaInvolucrada());
	      modificarService.modificarSolicitudSC(confi);
	    }
		return null;
	}
	
	@PutMapping("/TipoDocumento/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TipoDocumento2 confi) {
		TipoDocumento2 _tutorial = modificarService.findByIdTipoDocumento(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarTipoDocumento(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Rol/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Rol2 confi) {
		Rol2 _tutorial = modificarService.findByIdRol(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdJerarquia(confi.getIdJerarquia());
	      modificarService.modificarRol(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Modulo/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Modulo2 confi) {
		Modulo2 _tutorial = modificarService.findByIdModulo(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarModulo(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Jerarquia/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Jerarquia2 confi) {
		Jerarquia2 _tutorial = modificarService.findByIdJerarquia(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarJerarquia(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Configuracion/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Configuracion2 confi) {
		Configuracion2 _tutorial = modificarService.findByIdConfiguracion(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setNombre(confi.getNombre());
	      _tutorial.setValor(confi.getValor());
	      modificarService.modificarConfiguracion(confi);
	    }
		return null;
	  }
	
	@PutMapping("/TipoTurno/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TipoTurno2 confi) {
		TipoTurno2 _tutorial = modificarService.findByIdTipoTurno(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarTipoTurno(confi);
	    }
		return null;
	  }
	
	@PutMapping("/TipoNovedades/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TipoNovedades2 confi) {
		TipoNovedades2 _tutorial = modificarService.findByIdTipoNovedad(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setObservacion(confi.getObservacion());
	      modificarService.modificarTipoNovedad(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Turnos/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Turnos2 confi) {
		Turnos2 _tutorial = modificarService.findByIdTurnos(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setHoraFinal(confi.getHoraFinal());
	      _tutorial.setHoraInicio(confi.getHoraInicio());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdTipoTurno(confi.getIdTipoTurno());
	      modificarService.modificarTurnos(confi);
	    }
		return null;
	  }
	
	@PutMapping("/ElementosVisita/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody ElementosVisita2 confi) {
		ElementosVisita2 _tutorial = modificarService.findByIdElementosVisita(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarElementosVisita(confi);
	    }
		return null;
	  }
	
	@PutMapping("/OpcionesVisita/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody OpcionesVisita2 confi) {
		OpcionesVisita2 _tutorial = modificarService.findByIdOpcionesVisita(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarOpcionesVisita(confi);
	    }
		return null;
	  }
	
	@PutMapping("/TipoServicio/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TipoServicio2 confi) {
		TipoServicio2 _tutorial = modificarService.findByIdTipoServicios(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarTipoServicios(confi);
	    }
		return null;
	  }
	
	@PutMapping("/EscalaSolicitud/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody EscalaSolicitudes2 confi) {
		EscalaSolicitudes2 _tutorial = modificarService.findByIdEscalaSolicitud(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarEscalaSolicitud(confi);
	    }
		return null;
	  }
	
	@PutMapping("/MotivoSolicitud/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody MotivoSolicitud2 confi) {
		MotivoSolicitud2 _tutorial = modificarService.findByIdMotivoSolicitud(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdArea(confi.getIdArea());
	      modificarService.modificarMotivoSolicitud(confi);
	    }
		return null;
	  }
	
	@PutMapping("/ClienteSC/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody ClienteSC2 confi) {
		ClienteSC2 _tutorial = modificarService.findByIdClienteSC(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setNombre(confi.getNombre());
	      _tutorial.setApellido(confi.getApellido());
	      _tutorial.setCorreo(confi.getCorreo());
	      _tutorial.setDocumento(confi.getDocumento());
	      _tutorial.setIdTipoDocumento(confi.getIdTipoDocumento());
	      _tutorial.setTelefono(confi.getTelefono());
	      modificarService.modificarClienteSC(confi);
	    }
		return null;
	  }
	
	@PutMapping("/AsignacionUsuariosPQRS/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody AsignacionUsuarioPQRS2 confi) {
		AsignacionUsuarioPQRS2 _tutorial = modificarService.findByIdAsignacionUsuarioPQRS(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdArea(confi.getIdArea());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarAsignacionUsuarioPQRS(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Area/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Area2 confi) {
		Area2 _tutorial = modificarService.findByIdArea(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarArea(confi);
	    }
		return null;
	  }
	
	@PutMapping("/IngresoPersonalEmpresa/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody IngresoPersonalEmpresa2 confi) {
		IngresoPersonalEmpresa2 _tutorial = modificarService.findByIdIngresoPersonalEmpresa(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setNombre(confi.getNombre());
	      _tutorial.setApellido(confi.getApellido());
	      _tutorial.setIdTipoDocumento(confi.getIdTipoDocumento());
	      _tutorial.setDocumento(confi.getDocumento());
	      _tutorial.setId_area(confi.getId_area());
	      _tutorial.setHoraIngreso(confi.getHoraIngreso());
	      _tutorial.setHoraSalida(confi.getHoraSalida());
	      _tutorial.setId_estado(confi.getId_estado());
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setIde_oficina(confi.getIde_oficina());
	      _tutorial.setId_sede(confi.getId_sede());
	      _tutorial.setNombreImagen(confi.getNombreImagen());
	      _tutorial.setRh(confi.getRh());
	      _tutorial.setTelefono(confi.getTelefono());
	      _tutorial.setEps(confi.getEps());
	      _tutorial.setArl(confi.getArl());
	      modificarService.modificarIngresoPersonalEmpresa(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Sede/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Sede2 confi) {
		Sede2 _tutorial = modificarService.findByIdSede(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarSede(confi);
	    }
		return null;
	  }
	
	@PutMapping("/TipoActivo/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TipoActivo2 confi) {
		TipoActivo2 _tutorial = modificarService.findByIdTipoActivo(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarTipoActivo(confi); 
	    }
		return null;
	  }
	
	@PutMapping("/TiposProcesos/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TiposProcesos2 confi) {
		TiposProcesos2 _tutorial = modificarService.findByIdTiposProcesos(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarTiposProcesos(confi);
	    }
		return null;
	  }
	
	@PutMapping("/DetalleArticulo/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody DetalleArticulo2 confi) {
		DetalleArticulo2 _tutorial = modificarService.findByIdDetalleArticulo(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setMarca(confi.getMarca());
	      _tutorial.setCodigo_contable(confi.getCodigo_contable());
	      _tutorial.setPlaca(confi.getPlaca());
	      _tutorial.setSerial(confi.getSerial());
	      _tutorial.setIdArticulo(confi.getIdArticulo());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      _tutorial.setIdTipoActivo(confi.getIdTipoActivo());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      _tutorial.setValor(confi.getValor());
	      _tutorial.setIdOrdenCompra(confi.getIdOrdenCompra());
	      modificarService.modificarDetalleArticulo(confi);
	    }
		return null;
	  }
	
	@PutMapping("/HistorialArticulo/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody HistorialArticulo2 confi) {
		HistorialArticulo2 _tutorial = modificarService.findByIdHistorialArticulo(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setObservacion(confi.getObservacion());
	      _tutorial.setIdDetalleArticulo(confi.getIdDetalleArticulo());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarHistorialArticulo(confi);
	    }
		return null;
	  }	
	@PutMapping("/AsignacionesProcesos/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody AsignacionesProcesos2 confi) {
		AsignacionesProcesos2 _tutorial = modificarService.findByIdAsignacionesProcesos(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdTiposProcesos(confi.getIdTiposProcesos());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarAsignacionesProcesos(confi);
	    }
		return null;
	  }
	
	@PutMapping("/AsignacionesArticulos/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody AsignacionesArticulos2 confi) {
		AsignacionesArticulos2 _tutorial = modificarService.findByIdAsignacionesArticulos(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdAsignacionesProcesos(confi.getIdAsignacionesProcesos());
	      _tutorial.setIdDetalleArticulo(confi.getIdDetalleArticulo());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarAsignacionesArticulos(confi);
	    }
		return null;
	  }
	
	@PutMapping("/AsignacionPuntoVentaArticulo/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody AsignacionPuntoVentaArticulo2 confi) {
		AsignacionPuntoVentaArticulo2 _tutorial = modificarService.findByIdAsignacionPuntoVentaArticulo(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdOficina(confi.getIdOficina());
	      _tutorial.setIdSitioVenta(confi.getIdSitioVenta());
	      _tutorial.setIdAsignacionesArticulos(confi.getIdAsignacionesArticulos());
	      _tutorial.setCantidad(confi.getCantidad());
	      _tutorial.setNombreOficina(confi.getNombreOficina());
	      _tutorial.setNombreSitioVenta(confi.getNombreSitioVenta());
	      modificarService.modificarAsignacionPuntoVentaArticulo(confi);
	    }
		return null;
	  }
	
	@PutMapping("/ActivoBaja/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody ArticulosBaja2 confi) {
		ArticulosBaja2 _tutorial = modificarService.findByIdArticulosBaja(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setObservacion(confi.getObservacion());
	      _tutorial.setId_detalle_articulo(confi.getId_detalle_articulo());
	      _tutorial.setId_opcion_baja(confi.getId_opcion_baja());
	      _tutorial.setId_solicitud_baja(confi.getId_solicitud_baja());
	      _tutorial.setId_estado(confi.getId_estado());
	      modificarService.modificarArticulosBaja(confi);
	    }
		return null;

	  }
	
	@PutMapping("/SolicitudBajasArticulos/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody SolicitudBajasArticulos2 confi) {
		SolicitudBajasArticulos2 _tutorial = modificarService.findByIdSolicitudBajasArticulos(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setId_usuario(confi.getId_usuario());
	      _tutorial.setId_estado(confi.getId_estado());
	      _tutorial.setUsuario_autorizacion(confi.getUsuario_autorizacion());
	      _tutorial.setUsuario_confirmacion(confi.getUsuario_confirmacion());
	      _tutorial.setEstado_contabilidad(confi.getEstado_contabilidad());
	      modificarService.modificarSolicitudBajasArticulos(confi);
	    }
		return null;

	  }
	
	@PutMapping("/Compras/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Compras2 confi) {
		Compras2 _tutorial = modificarService.findByIdCompras(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setId_articulo(confi.getId_articulo());
	      _tutorial.setId_usuario(confi.getId_usuario());
	      _tutorial.setCantidad(confi.getCantidad());
	      _tutorial.setId_orden_compra(confi.getId_orden_compra());
	      modificarService.modificarCompras(confi);
	    }
		return null;
		
	  }
	
	@PutMapping("/Inventario/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Inventario2 confi) {
		Inventario2 _tutorial = modificarService.findByIdInventario(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setId_usuario(confi.getId_usuario());
	      _tutorial.setId_detalle_articulo(confi.getId_detalle_articulo());
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setCantidad(confi.getCantidad());
	      _tutorial.setId_orden_compra(confi.getId_orden_compra());
	      modificarService.modificarInventario(confi);
	    }
		return null;
		
	  }
	
	@PutMapping("/MovimientoComprasInventario/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody MovimientoComprasInventario2 confi) {
		MovimientoComprasInventario2 _tutorial = modificarService.findByIdMovimientoComprasInventario(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setId_articulo(confi.getId_articulo());
	      _tutorial.setCantidad(confi.getCantidad());
	      _tutorial.setIdOrdenCompra(confi.getIdOrdenCompra());
	      modificarService.modificarMovimientoComprasInventario(confi);
	    }
		return null;
		
	  }
	
	@PutMapping("/TipoNecesidad/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody TipoNecesidad2 confi) {
		TipoNecesidad2 _tutorial = modificarService.findByIdTipoNecesidad(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarTipoNecesidad(confi);
	    }
		return null;

	  }
	
	@PutMapping("/SubProceso/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody SubProceso2 confi) {
		SubProceso2 _tutorial = modificarService.findByIdSubProceso(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdTipoProceso(confi.getIdTipoProceso());
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarSubProceso(confi);
	    }
		return null;

	  }
	
	@PutMapping("/MatrizNecesidad/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody MatrizNecesidad2 confi) {
		MatrizNecesidad2 _tutorial = modificarService.findByIdMatrizNecesidad(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setCantidad(confi.getCantidad());
	      _tutorial.setCantidadEjecuciones(confi.getCantidadEjecuciones());
	      _tutorial.setCostoEstimado(confi.getCostoEstimado());
	      _tutorial.setCostoTotal(confi.getCostoTotal());
	      _tutorial.setCostoUnitario(confi.getCostoUnitario());
	      _tutorial.setDetalle(confi.getDetalle());
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setPorcentajeTotal(confi.getPorcentajeTotal());
	      _tutorial.setIdSubProceso(confi.getIdSubProceso());
	      _tutorial.setIdTipoNecesidad(confi.getIdTipoNecesidad());
	      _tutorial.setCumPlaneacion(confi.getCumPlaneacion());
	      modificarService.modificarMatrizNecesidad(confi);
	    }
		return null;

	  }
	
	@PutMapping("/MatrizNecesidadDetalle/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody MatrizNecesidadDetalle2 confi) {
		MatrizNecesidadDetalle2 _tutorial = modificarService.findByIdMatrizNecesidadDetalle(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setFecha_ejecutada(confi.getFecha_ejecutada());
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setPorcentaje(confi.getPorcentaje());
	      _tutorial.setCantidad_ejecuciones(confi.getCantidad_ejecuciones());
	      _tutorial.setCantidad_ejecuciones_cumplidas(confi.getCantidad_ejecuciones_cumplidas());
	      _tutorial.setCantidad_estimada(confi.getCantidad_estimada());
	      _tutorial.setCantidad_comprada(confi.getCantidad_comprada());
	      _tutorial.setCosto_ejecucion_comprada(confi.getCosto_ejecucion_comprada());
	      _tutorial.setId_matriz_necesidad(confi.getId_matriz_necesidad());
	      _tutorial.setId_orden_compra(confi.getId_orden_compra());
	      _tutorial.setId_estado(confi.getId_estado());
	      modificarService.modificarMatrizNecesidadDetalle(confi);
	    }
		return null;
		
	  }
	
	@PutMapping("/MediosRadiacion/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody MediosRadiacion2 confi) {
		MediosRadiacion2 _tutorial = modificarService.findByIdMediosRadiacion(id);
	    if (_tutorial != null) {
	    	_tutorial.setId(id);
		    _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarMediosRadiacion(confi);
	    }
		return null;
		
	  }
	
	@PutMapping("/PeriodoEjecucion/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody PeriodoEjecucion2 confi) {
		PeriodoEjecucion2 _tutorial = modificarService.findByIdPeriodoEjecucion(id);
	    if (_tutorial != null) {
	    	_tutorial.setId(id);
		    _tutorial.setDescripcion(confi.getDescripcion());
		    _tutorial.setCantidad(confi.getCantidad());
	      modificarService.modificarPeriodoEjecucion(confi);
	    }
		return null;
		
	  }
	@PutMapping("/OpcionArticuloBaja/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody OpcionArticuloBaja2 confi) {
		PeriodoEjecucion2 _tutorial = modificarService.findByIdPeriodoEjecucion(id);
	    if (_tutorial != null) {
	    	_tutorial.setId(id);
		    _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarOpcionArticuloBaja(confi);
	    }
		return null;
		
	  }
	
	@PutMapping("/JerarquiaCuentas/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody JerarquiaCuentas2 confi) {
		JerarquiaCuentas2 _tutorial = modificarService.findByIdJerarquiaCuentas(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      modificarService.modificarJerarquiaCuentas(confi);
	    }
		return null;
	  }
	
	@PutMapping("/Cuenta/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody Cuenta2 confi) {
		Cuenta2 _tutorial = modificarService.findByIdCuenta(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setCodigo(confi.getCodigo());
	      _tutorial.setIdJerarquiaCuentas(confi.getIdJerarquiaCuentas());
	      modificarService.modificarCuenta(confi);
	    }
		return null;
	  }
	
	@PutMapping("/LibroMayor/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody LibroMayor2 confi) {
		LibroMayor2 _tutorial = modificarService.findByIdLibroMayor(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setIdCuenta(confi.getIdCuenta());
	      _tutorial.setValor(confi.getValor());
	      _tutorial.setFecha(confi.getFecha());
	      modificarService.modificarLibroMayor(confi);
	    }
		return null;
	  }
	
	@PutMapping("/PorcentajePresupuesto/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody PorcentajePresupuesto2 confi) {
		PorcentajePresupuesto2 _tutorial = modificarService.findByIdPorcentajePresupuesto(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setPorcentaje(confi.getPorcentaje());
	      _tutorial.setIdCuenta(confi.getIdCuenta());
	      modificarService.modificarPorcentajePresupuesto(confi);
	    }
		return null;
	  }
	
	@PutMapping("/PresupuestoContable/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody PresupuestoContable2 confi) {
		PresupuestoContable2 _tutorial = modificarService.findByIdPresupuestoContable(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setPresupuesto(confi.getPresupuesto());
	      _tutorial.setIdCuenta(confi.getIdCuenta());
	      modificarService.modificarPresupuestoContable(confi);
	    }
		return null;
	  }
	
	@PutMapping("/MotivoAutorizacionPago/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody MotivoAutorizacionPago2 confi) {
		MotivoAutorizacionPago2 _tutorial = modificarService.findByIdMotivoAutorizacionPago(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setDescripcion(confi.getDescripcion());
	      _tutorial.setIdEstado(confi.getIdEstado());
	      modificarService.modificarMotivoAutorizacionPago(confi);
	    }
		return null;
	  }
	
	@PutMapping("/ClienteAutorizacionPago/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody ClienteAutorizacionPago2 confi) {
		ClienteAutorizacionPago2 _tutorial = modificarService.findByIdClienteAutorizacionPago(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setNombre(confi.getNombre());
	      _tutorial.setCedula(confi.getCedula());
	      _tutorial.setDireccion(confi.getDireccion());
	      _tutorial.setTelefono(confi.getTelefono());
	      _tutorial.setIdTipoDocumento(confi.getIdTipoDocumento());
	      modificarService.modificarClienteAutorizacionPago(confi);
	    }
		return null;
	  }
	
	@PutMapping("/DatosFormularioPago/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody DatosFormularioPago2 confi) {
		DatosFormularioPago2 _tutorial = modificarService.findByIdDatosFormularioPago(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFechaSorteo(confi.getFechaSorteo());
	      _tutorial.setSeriePreImpresa(confi.getSeriePreImpresa());
	      _tutorial.setSerieImpresa(confi.getSerieImpresa());
	      _tutorial.setColillaImpresa(confi.getColillaImpresa());
	      _tutorial.setColillaPreImpresa(confi.getColillaPreImpresa());
	      _tutorial.setSerieCodigoVenta(confi.getSerieCodigoVenta());
	      _tutorial.setNombreSorteoLoteria(confi.getNombreSorteoLoteria());
	      _tutorial.setTotalFormulario(confi.getTotalFormulario());
	      _tutorial.setTotalGanadoBruto(confi.getTotalGanadoBruto());
	      _tutorial.setCedulaColocador(confi.getCedulaColocador());
	      _tutorial.setIdClientesAutorizacionPago(confi.getIdClientesAutorizacionPago());
	      modificarService.modificarDatosFormularioPago(confi);
	    }
		return null;
	  }
	
	@PutMapping("/SolicitudAutorizacionPago/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	  public ResponseEntity<String> updateTutorial(@PathVariable("id") long id, @RequestBody SolicitudAutorizacionPago2 confi) {
		SolicitudAutorizacionPago2 _tutorial = modificarService.findByIdSolicitudAutorizacionPago(id);
	    if (_tutorial != null) {
	      _tutorial.setId(id);
	      _tutorial.setFecha(confi.getFecha());
	      _tutorial.setIdOficina(confi.getIdOficina());
	      _tutorial.setNombreOficiona(confi.getNombreOficiona());
	      _tutorial.setIdDatosFormularioPago(confi.getIdDatosFormularioPago());
	      _tutorial.setIdMotivoAutorizacionPago(confi.getIdMotivoAutorizacionPago());
	      _tutorial.setIdUsuario(confi.getIdUsuario());
	      modificarService.modificarSolicitudAutorizacionPago(confi);
	    }
		return null;
	  }
}


