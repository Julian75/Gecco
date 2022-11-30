package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.ClientesAutorizacionPago;

public interface IClienteAutorizacionPagoService {
public List<ClientesAutorizacionPago> all();
	
	public Optional<ClientesAutorizacionPago> findById(Long id);
	
	public ClientesAutorizacionPago save(ClientesAutorizacionPago clienteAutorizacionPago);
	
	public void delete(Long id);
}
