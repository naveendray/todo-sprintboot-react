package com.naveen.todo.repository;

import com.naveen.todo.model.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoItemRepository extends JpaRepository<ToDoItem,Integer> {
}
