package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.ClientesAutorizacionPago;
import com.gecco.Repository.IClienteAutorizacionPagoRepository;
import com.gecco.Service.IClienteAutorizacionPagoService;

@Service
public class ClienteAutorizacionPagoServiceImplement implements IClienteAutorizacionPagoService{
	@Autowired
	private IClienteAutorizacionPagoRepository repository;
	        
	
	@Override
	public List<ClientesAutorizacionPago> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<ClientesAutorizacionPago> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public ClientesAutorizacionPago save(ClientesAutorizacionPago clienteAutorizacionPago) {
		return this.repository.save(clienteAutorizacionPago);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
