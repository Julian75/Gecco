package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.ClienteSC;

public interface IClienteSCService {

	public List<ClienteSC> all();
	
	public Optional<ClienteSC> findById(Long id);
	
	public ClienteSC save(ClienteSC clienteSC);
	
	public void delete(Long id);
}
