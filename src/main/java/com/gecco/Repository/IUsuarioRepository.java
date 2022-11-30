package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {

}
