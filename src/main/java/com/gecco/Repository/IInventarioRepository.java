package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gecco.Entity.Inventario;

public interface IInventarioRepository extends JpaRepository<Inventario,Long> {

}
