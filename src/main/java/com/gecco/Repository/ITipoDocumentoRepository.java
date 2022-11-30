package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.TipoDocumento;

public interface ITipoDocumentoRepository extends JpaRepository<TipoDocumento, Long>{

}
