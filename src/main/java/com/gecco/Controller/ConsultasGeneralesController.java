package com.gecco.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gecco.Entity.ConsultaRaspa;
import com.gecco.EntityModifica.Accesos2;
import com.gecco.EntityModifica.ArchivoSolicitud2;
import com.gecco.EntityModifica.AsigArtiReporteEmpresas;
import com.gecco.EntityModifica.AsignacionActivoConsulta;
import com.gecco.EntityModifica.AsignacionActivoPuntoVentaConsulta;
import com.gecco.EntityModifica.AsignacionPuntoVentaArticulo2;
import com.gecco.EntityModifica.AsignacionesActivosPendiente2;
import com.gecco.EntityModifica.AsignacionesArticulos2;
import com.gecco.EntityModifica.AsignacionesProcesos2;
import com.gecco.EntityModifica.AsignarTurnoVendedor2;
import com.gecco.EntityModifica.AuditoriaActivo2;
import com.gecco.EntityModifica.AuditoriaActivoRegistro2;
import com.gecco.EntityModifica.Cotizacion2;
import com.gecco.EntityModifica.Cuenta2;
import com.gecco.EntityModifica.DetalleArticuloSinBaja;
import com.gecco.EntityModifica.DetalleSolicitud2;
import com.gecco.EntityModifica.GestionProceso2;
import com.gecco.EntityModifica.Historial2;
import com.gecco.EntityModifica.HistorialArticulo2;
import com.gecco.EntityModifica.HistorialSolicitudes2;
import com.gecco.EntityModifica.Inventario2;
import com.gecco.EntityModifica.LibroMayor2;
import com.gecco.EntityModifica.MatrizNecesidadConsultaCierre;
import com.gecco.EntityModifica.MatrizNecesidadDetalle2;
import com.gecco.EntityModifica.OrdenCompra2;
import com.gecco.EntityModifica.PorcentajePresupuesto2;
import com.gecco.EntityModifica.PresupuestoContable2;
import com.gecco.EntityModifica.Proceso2;
import com.gecco.EntityModifica.Raspas2;
import com.gecco.EntityModifica.Soporte2;
import com.gecco.EntityModifica.UsuariosAdministracion2;
import com.gecco.EntityModifica.matrizNecesidadDetalleConsulta;
import com.gecco.Service.IConsultasGeneralesService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/ConsultasGenerales")
public class ConsultasGeneralesController {

	@Autowired IConsultasGeneralesService consultasService;

	@GetMapping("/ObtenerRaspa")
	public ResponseEntity<List<ConsultaRaspa>> getAllDatos(@RequestParam(required = false) String raspa) {
	    try {
	      List<ConsultaRaspa> datos = new ArrayList<ConsultaRaspa>();
//	      if (fecha == null)
//	    	  novedadesService.findAll().forEach(datos::add);
//	      else
	      consultasService.findByRaspa(raspa).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerRaspasSiga")
	public ResponseEntity<List<ConsultaRaspa>> getAllRaspas(@RequestParam(required = false) String raspa) {
	    try {
	      List<ConsultaRaspa> datos = new ArrayList<ConsultaRaspa>();
	      if (raspa == null)
	    	  consultasService.getAll().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerCotizacion")
	public ResponseEntity<List<Cotizacion2>> getAllCotizacion(@RequestParam(required = false) Integer idSolicitud) {
	    try {
	      List<Cotizacion2> datos = new ArrayList<Cotizacion2>();
	      consultasService.findByCotizacion(idSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerUsuariosAdministracion")
	public ResponseEntity<List<UsuariosAdministracion2>> getAllUsuariosAdministracion(@RequestParam(required = false) Integer idSolicitud) {
	    try {
	      List<UsuariosAdministracion2> datos = new ArrayList<UsuariosAdministracion2>();
	      consultasService.findByUsuariosAdministracion(idSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerOrdenCompra")
	public ResponseEntity<List<OrdenCompra2>> getAllOrdenCompra(@RequestParam(required = false) Integer idSolicitud) {
	    try {
	      List<OrdenCompra2> datos = new ArrayList<OrdenCompra2>();
	      consultasService.findByOrdenCompra(idSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerGestionProceso")
	public ResponseEntity<List<GestionProceso2>> getAllGestionProceso(@RequestParam(required = false) Integer idUsuario) {
	    try {
	      List<GestionProceso2> datos = new ArrayList<GestionProceso2>();
	      consultasService.findByGestionProceso(idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerDetalleSolicitud")
	public ResponseEntity<List<DetalleSolicitud2>> getAllDetalleSolicitud(@RequestParam(required = false) Integer idSolicitud) {
	    try {
	      List<DetalleSolicitud2> datos = new ArrayList<DetalleSolicitud2>();
	      consultasService.findByDetalleSolicitud(idSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerProceso")
	public ResponseEntity<List<Proceso2>> getAllProceso(@RequestParam(required = false) Integer idCategoria) {
	    try {
	      List<Proceso2> datos = new ArrayList<Proceso2>();
	      consultasService.findByProceso(idCategoria).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerDetalleSolicitudEst")
	public ResponseEntity<List<DetalleSolicitud2>> getAllDetalleSolicitudEst(@RequestParam(required = false) Integer idSolicitud) {
	    try {
	      List<DetalleSolicitud2> datos = new ArrayList<DetalleSolicitud2>();
	      consultasService.findBySolicitudDetalleEst(idSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerDetalleSolicitudEstados")
	public ResponseEntity<List<DetalleSolicitud2>> getAllDetalleSolicitudEstados(@RequestParam(required = false) Integer idSolicitud) {
	    try {
	      List<DetalleSolicitud2> datos = new ArrayList<DetalleSolicitud2>();
	      consultasService.findBySolicitudDetalleEstados(idSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerHistorial")
	public ResponseEntity<List<Historial2>> getAllHistorial(@RequestParam(required = false) Integer idSolicitudSC) {
	    try {
	      List<Historial2> datos = new ArrayList<Historial2>();
	      consultasService.findByHistorial(idSolicitudSC).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerSoporteSC")
	public ResponseEntity<List<Soporte2>> getAllSoporte(@RequestParam(required = false) Integer idHistorialSC) {
	    try {
	      List<Soporte2> datos = new ArrayList<Soporte2>();
	      consultasService.findBySoporte(idHistorialSC).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerArchivosSC")
	public ResponseEntity<List<ArchivoSolicitud2>> getAllArchivoSolicitud(@RequestParam(required = false) Integer idSolicitudSC) {
	    try {
	      List<ArchivoSolicitud2> datos = new ArrayList<ArchivoSolicitud2>();
	      consultasService.findByArchivoSolicitud(idSolicitudSC).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAsignarTurnosVendedores")
	public ResponseEntity<List<AsignarTurnoVendedor2>> getAllAsignarTurnosVendedores(@RequestParam(required = false) String fechaActual) {
	    try {
	      List<AsignarTurnoVendedor2> datos = new ArrayList<AsignarTurnoVendedor2>();
	      consultasService.findByAsignarTurnoVendedor(fechaActual).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerInventarioBaja")
	public ResponseEntity<List<Inventario2>> getAllArticulosBaja() {
	    try {
	      List<Inventario2> datos = new ArrayList<Inventario2>();
	      consultasService.findByArticulosBaja().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAsignacionArticulos")
	public ResponseEntity<List<AsignacionActivoConsulta>> getAllAsignacionArticulo(@RequestParam(required = false) Long idUsuario){
	    try {
	      List<AsignacionActivoConsulta> datos = new ArrayList<AsignacionActivoConsulta>();
	      consultasService.findByAsignacionArticulo(idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerHistorialesSolicitudes")
	public ResponseEntity<List<HistorialSolicitudes2>> getAllHistorialSolicitudes(@RequestParam(required = false) Integer idSolicitudSC) {
	    try {
	      List<HistorialSolicitudes2> datos = new ArrayList<HistorialSolicitudes2>();
	      consultasService.findByHistorialSolicitudes(idSolicitudSC).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerCuenta")
	public ResponseEntity<List<Cuenta2>> getAllCuenta(@RequestParam(required = false) Integer codigo) {
	    try {
	      List<Cuenta2> datos = new ArrayList<Cuenta2>();
	      consultasService.findByCuentas(codigo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerLibroMayor")
	public ResponseEntity<List<LibroMayor2>> getAllLibroMayor(@RequestParam(required = false) Long idCuenta, String fecha) {
	    try {
	      List<LibroMayor2> datos = new ArrayList<LibroMayor2>();
	      consultasService.findByLibroMayor(idCuenta,fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerPorcentajePresupuesto")
	public ResponseEntity<List<PorcentajePresupuesto2>> getAllPorcentajePresupuesto(@RequestParam(required = false) Long idCuenta, String fecha) {
	    try {
	      List<PorcentajePresupuesto2> datos = new ArrayList<PorcentajePresupuesto2>();
	      consultasService.findByPorcentajePresupuesto(idCuenta,fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerPresupuestoContable")
	public ResponseEntity<List<PresupuestoContable2>> getAllPresupuestoContable(@RequestParam(required = false) String fecha) {
	    try {
	      List<PresupuestoContable2> datos = new ArrayList<PresupuestoContable2>();
	      consultasService.findByPresupuestoContable(fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerLibroMayorFechas")
	public ResponseEntity<List<LibroMayor2>> getAllLibroMayorFechas(@RequestParam(required = false) Long idCuenta, String fecha) {
	    try {
	      List<LibroMayor2> datos = new ArrayList<LibroMayor2>();
	      consultasService.findByLibroMayorFechas(idCuenta, fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerLibroMayorAñoyMes")
	public ResponseEntity<List<LibroMayor2>> getAllLibroMayorAñoyMes(@RequestParam(required = false) String fecha) {
	    try {
	      List<LibroMayor2> datos = new ArrayList<LibroMayor2>();
	      consultasService.findByLibroMayoAñoyMes(fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerPresupuestoContableCuentaFecha")
	public ResponseEntity<List<PresupuestoContable2>> getAllPresupuestoContableCuentaFecha(@RequestParam(required = false) Long idCuenta, String fecha) {
	    try {
	      List<PresupuestoContable2> datos = new ArrayList<PresupuestoContable2>();
	      consultasService.findByPresupuestoContableCuentaFecha(idCuenta,fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerLibroMayorAño")
	public ResponseEntity<List<LibroMayor2>> getAllLibroMayorAño(@RequestParam(required = false)String fecha) {
	    try {
	      List<LibroMayor2> datos = new ArrayList<LibroMayor2>();
	      consultasService.findByLibroMayorAño(fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	

	@GetMapping("/ObtenerCuentaJerarquia")
	public ResponseEntity<List<Cuenta2>> getAllCuentaJerarquia(@RequestParam(required = false)Long idJerarquiaCuenta) {
	    try {
	      List<Cuenta2> datos = new ArrayList<Cuenta2>();
	      consultasService.findByCuentasJerarquia(idJerarquiaCuenta).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerRaspasGecco")
	public ResponseEntity<List<Raspas2>> getAllRaspasGecoo(@RequestParam(required = false)String fechaInicio, String fechaFinal) {
	    try {
	      List<Raspas2> datos = new ArrayList<Raspas2>();
	      consultasService.findByRaspasGecco(fechaInicio, fechaFinal).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAuditoriaActivo")
	public ResponseEntity<List<AuditoriaActivo2>> getAllAuditoriaActivo(@RequestParam(required = false)Long idAuditoriaActivoRegistro, Long idAsignacionPuntoVentaActivo) {
	    try {
	      List<AuditoriaActivo2> datos = new ArrayList<AuditoriaActivo2>();
	      consultasService.findByAuditoriaActivo(idAuditoriaActivoRegistro, idAsignacionPuntoVentaActivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAuditoriaActivoRegistroFechas")
	public ResponseEntity<List<AuditoriaActivoRegistro2>> getAllAuditoriaActivoRegistroFechas(@RequestParam(required = false)String fechaInicio, String fechaFinal) {
	    try {
	      List<AuditoriaActivoRegistro2> datos = new ArrayList<AuditoriaActivoRegistro2>();
	      consultasService.findByAuditoriaActivoRegistroFechas(fechaInicio, fechaFinal).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAuditoriaActivoRegistro")
	public ResponseEntity<List<AuditoriaActivoRegistro2>> getAllAuditoriaActivoRegistro(@RequestParam(required = false)String fecha, Long idUsuario) {
	    try {
	      List<AuditoriaActivoRegistro2> datos = new ArrayList<AuditoriaActivoRegistro2>();
	      consultasService.findByAuditoriaActivoRegistro(fecha, idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerGestionProcesoSolicitud")
	public ResponseEntity<List<GestionProceso2>> getAllGestionProcesoSolicitud(@RequestParam(required = false) Long idDetalleSolicitud) {
	    try {
	      List<GestionProceso2> datos = new ArrayList<GestionProceso2>();
	      consultasService.findByGestionProcesoSolicitud(idDetalleSolicitud).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAuditoriaActivoIdRegistro")
	public ResponseEntity<List<AuditoriaActivo2>> getAllAuditoriaActivoIdRegistro(@RequestParam(required = false)Long idAuditoriaActivoRegistro) {
	    try {
	      List<AuditoriaActivo2> datos = new ArrayList<AuditoriaActivo2>();
	      consultasService.findByAuditoriaActivIdRegistro(idAuditoriaActivoRegistro).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAccesos")
	public ResponseEntity<List<Accesos2>> getAllAccesos(@RequestParam(required = false)Long idRol) {
	    try {
	      List<Accesos2> datos = new ArrayList<Accesos2>();
	      consultasService.findByAccesos(idRol).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerMatrizDetalleProceso")
	public ResponseEntity<List<MatrizNecesidadDetalle2>> getAllMatrizDetalleProceso(@RequestParam(required = false)Long idTipoProceso, String fecha) {
	    try {
	      List<MatrizNecesidadDetalle2> datos = new ArrayList<MatrizNecesidadDetalle2>();
	      consultasService.findByMatrizDetalleProceso(idTipoProceso, fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAsignacionProceso")
	public ResponseEntity<List<AsignacionesProcesos2>> getAllAsignacionProceso(@RequestParam(required = false)Long idUsuario) {
	    try {
	      List<AsignacionesProcesos2> datos = new ArrayList<AsignacionesProcesos2>();
	      consultasService.findByAsignacionProceso(idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticulosEstadoDetalle1")
	public ResponseEntity<List<AsignacionActivoConsulta>> getAllAsignacionArticulosEstadoDetalle1(@RequestParam(required = false)Long idUsuario) {
	    try {
	      List<AsignacionActivoConsulta> datos = new ArrayList<AsignacionActivoConsulta>();
	      consultasService.findByAsignacionArticulosEstadoDetalle1(idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticulosSitioVenta")
	public ResponseEntity<List<AsignacionActivoPuntoVentaConsulta>> getAllAsignacionArticulosSitioVenta(@RequestParam(required = false)Long idProceso, Long ideOficina, Long ideSitioVenta) {
	    try {
	      List<AsignacionActivoPuntoVentaConsulta> datos = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
	      consultasService.findByAsignacionArticulosSitioVenta(idProceso, ideOficina, ideSitioVenta).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionActivoIdeDetalle")
	public ResponseEntity<List<AsignacionPuntoVentaArticulo2>> getAllAsignacionActivoIdeDetalle(@RequestParam(required = false)Long idDetalleActivo, Long ideOficina, Long ideSitioVenta) {
	    try {
	      List<AsignacionPuntoVentaArticulo2> datos = new ArrayList<AsignacionPuntoVentaArticulo2>();
	      consultasService.findByAsignacionActivoIdeDetalle(idDetalleActivo, ideOficina, ideSitioVenta).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerHistorialActivo")
	public ResponseEntity<List<HistorialArticulo2>> getAllHistorialActivo(@RequestParam(required = false)Long idDetalleActivo) {
	    try {
	      List<HistorialArticulo2> datos = new ArrayList<HistorialArticulo2>();
	      consultasService.findByHistorialActivo(idDetalleActivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionPuntoVentaArtDetArtUsuario")
	public ResponseEntity<List<AsignacionPuntoVentaArticulo2>> getAllAsignacionPuntoVentaArtDetArtUsuario(@RequestParam(required = false)Long idDetalleArticulo, Long idUsuario) {
	    try {
	      List<AsignacionPuntoVentaArticulo2> datos = new ArrayList<AsignacionPuntoVentaArticulo2>();
	      consultasService.findByAsignPuntoVentArtDetArtUsuario(idDetalleArticulo, idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacinActivoPendiente")
	public ResponseEntity<List<AsignacionesActivosPendiente2>> getAllAsignacionesActivosPendiente(@RequestParam(required = false)Long idUsuarioAsignacionPendiente, Long idDetalleActivo) {
	    try {
	      List<AsignacionesActivosPendiente2> datos = new ArrayList<AsignacionesActivosPendiente2>();
	      consultasService.findByAsignacionesActivosPendiente(idUsuarioAsignacionPendiente, idDetalleActivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionActivoIdeDetalleActivo")
	public ResponseEntity<List<AsignacionesArticulos2>> getAllAsignacionArticuloIdeDetArt(@RequestParam(required = false)Long idDetalleActivo) {
	    try {
	      List<AsignacionesArticulos2> datos = new ArrayList<AsignacionesArticulos2>();
	      consultasService.findByAsignacionArticuloIdeDetArt(idDetalleActivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticulosSerial")
	public ResponseEntity<List<AsignacionActivoPuntoVentaConsulta>> getAllAsignacionArticulosSerial(@RequestParam(required = false)Long idProceso, String serial) {
	    try {
	      List<AsignacionActivoPuntoVentaConsulta> datos = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
	      consultasService.findByAsignacionArticulosSerial(idProceso, serial).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticulosPlaca")
	public ResponseEntity<List<AsignacionActivoPuntoVentaConsulta>> getAllAsignacionArticulosPlaca(@RequestParam(required = false)Long idProceso, String placa) {
	    try {
	      List<AsignacionActivoPuntoVentaConsulta> datos = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
	      consultasService.findByAsignacionArticulosPlaca(idProceso, placa).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticulosidUsuario")
	public ResponseEntity<List<AsignacionActivoPuntoVentaConsulta>> getAllAsignacionArticulosidUsuario(@RequestParam(required = false)Long idUsuario) {
	    try {
	      List<AsignacionActivoPuntoVentaConsulta> datos = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
	      consultasService.findByAsignacionArticulosidUsuario(idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionProcesoIdProceso")
	public ResponseEntity<List<AsignacionesProcesos2>> getAllAsignacionProcesoIdProceso(@RequestParam(required = false)Long idProceso) {
	    try {
	      List<AsignacionesProcesos2> datos = new ArrayList<AsignacionesProcesos2>();
	      consultasService.findByAsignacionProcesoIdProceso(idProceso).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizDetalleCompleto")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizDetalleCompleto() {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizDetalleCompleto().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizDetalleIdProcesoCompleto")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizDetalleIdProcesoCompleto(@RequestParam(required = false)Long idProceso) {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizDetalleIdProcesoCompleto(idProceso).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizDetalleIdSubprocesoCompleto")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizDetalleIdSubprocesoCompleto(@RequestParam(required = false)Long idSubProceso) {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizDetalleIdSubprocesoCompleto(idSubProceso).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizDetalleCompletoConsolidado")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizDetalleCompletoConsolidado() {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizDetalleCompletoConsolidado().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizDetalleIdProcesoCompletoConsolidado")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizDetalleIdProcesoCompletoConsolidado(Long idProceso) {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizDetalleIdProcesoCompletoConsolidado(idProceso).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizDetalleIdSubprocesoCompletoConsolidado")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizDetalleIdSubprocesoCompletoConsolidado(Long idSubProceso) {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizDetalleIdSubprocesoCompletoConsolidado(idSubProceso).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAccesosModulo76")
	public ResponseEntity<List<Accesos2>> getAllAccesosModulo76(@RequestParam(required = false)Long idRol) {
	    try {
	      List<Accesos2> datos = new ArrayList<Accesos2>();
	      consultasService.findByAccesosModulo76(idRol).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizNecesidadesLista")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizNecesidadesLista(String ano) {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizNecesidadesLista(ano).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizNecesidadesListaIdProceso")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> MatrizNecesidadesListaIdProceso(Long idUsuario) {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizNecesidadesListaIdProceso(idUsuario).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticuloDetArtUsuario")
	public ResponseEntity<List<AsignacionesArticulos2>> getAllAsignacionArticuloArtDetArtUsuario(@RequestParam(required = false)Long idDetalleArticulo, Long idUsuario, String dispositivo) {
	    try {
	      List<AsignacionesArticulos2> datos = new ArrayList<AsignacionesArticulos2>();
	      consultasService.findByAsignArticuloDetalleArtUsuario(idDetalleArticulo, idUsuario, dispositivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignacionArticulosBajaUsuario")
	public ResponseEntity<List<AsignacionesArticulos2>> getAllArticulosBajaUsuario(@RequestParam(required = false) Long idUsuario, String dispositivo) {
	    try {
	      List<AsignacionesArticulos2> datos = new ArrayList<AsignacionesArticulos2>();
	      consultasService.findByAsignacionArticulosBajaUsuario(idUsuario, dispositivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAsignacionArticuloUsuario")
	public ResponseEntity<List<AsignacionesArticulos2>> getAllInventarioUsuario(@RequestParam(required = false) Long idUsuario, String dispositivo) {
	    try {
	      List<AsignacionesArticulos2> datos = new ArrayList<AsignacionesArticulos2>();
	      consultasService.findByAsignacionArticuloUsuario(idUsuario, dispositivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerDetalleActivoSinBaja")
	public ResponseEntity<List<DetalleArticuloSinBaja>> getAllDetalleActivoSinBaja() {
	    try {
	      List<DetalleArticuloSinBaja> datos = new ArrayList<DetalleArticuloSinBaja>();
	      consultasService.findByAsignacionesActivosSinBaja().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerDetalleActivoCompletos")
	public ResponseEntity<List<DetalleArticuloSinBaja>> getAllDetalleActivoCompletos() {
	    try {
	      List<DetalleArticuloSinBaja> datos = new ArrayList<DetalleArticuloSinBaja>();
	      consultasService.findByAsignacionesActivosCompletos().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerMatrizNecesidadPrimerAño")
	public ResponseEntity<List<matrizNecesidadDetalleConsulta>> getAllMatrizNecesidadPrimerAño() {
	    try {
	      List<matrizNecesidadDetalleConsulta> datos = new ArrayList<matrizNecesidadDetalleConsulta>();
	      consultasService.findByMatrizNecesidadPrimerAño().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerMatrizNecesidadFechaProceso")
	public ResponseEntity<List<MatrizNecesidadConsultaCierre>> getAllMatrizNecesidadFechaProceso(@RequestParam(required = false) String fecha, Long idTipoProceso) {
	    try {
	      List<MatrizNecesidadConsultaCierre> datos = new ArrayList<MatrizNecesidadConsultaCierre>();
	      consultasService.findByMatrizNecesidadFechaProceso(fecha, idTipoProceso).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerMatrizDetalleIdMatriz")
	public ResponseEntity<List<MatrizNecesidadDetalle2>> getAllMatrizDetalleIdMatriz(@RequestParam(required = false) Long idMatriz) {
	    try {
	      List<MatrizNecesidadDetalle2> datos = new ArrayList<MatrizNecesidadDetalle2>();
	      consultasService.findByMatrizDetalleIdMatriz(idMatriz).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	@GetMapping("/ObtenerAsignPuntoVentActivoIdAsignActivo")
	public ResponseEntity<List<AsignacionPuntoVentaArticulo2>> getAllAsignPuntoVentActivoIdAsignActivo(@RequestParam(required = false)Long idAsignacionActivo) {
	    try {
	      List<AsignacionPuntoVentaArticulo2> datos = new ArrayList<AsignacionPuntoVentaArticulo2>();
	      consultasService.findByAsignPuntoVentActivoIdAsignActivo(idAsignacionActivo).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	
	@GetMapping("/ObtenerAsignArtiReporteEmpresa")
	public ResponseEntity<List<AsigArtiReporteEmpresas>> getAllAsignArtiReporteEmpresa() {
	    try {
	      List<AsigArtiReporteEmpresas> datos = new ArrayList<AsigArtiReporteEmpresas>();
	      consultasService.findByAsignArtReporteEmpresa().forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
}
