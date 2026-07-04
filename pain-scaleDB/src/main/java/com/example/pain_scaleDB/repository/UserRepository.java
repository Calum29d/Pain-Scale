package com.example.pain_scaleDB.repository;

import com.example.pain_scaleDB.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*This is the class that allows us to access the database with the builtins from JpaRepository, we also create a custom 
method findByUsername which spring auto generates the sql for us */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
}
