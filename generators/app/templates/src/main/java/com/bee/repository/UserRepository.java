package com.bee.repository;

import com.bee.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by guos on 2018/11/4
 */
//@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
