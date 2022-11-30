package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Categoria;

public interface ICategoriaRepository extends JpaRepository<Categoria, Long>{

}
