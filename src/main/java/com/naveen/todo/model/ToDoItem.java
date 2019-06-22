package com.naveen.todo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ToDoItem {
    @Id
    private int id;
    private String todo;
    private boolean completed;

    public ToDoItem(){

    }

    public ToDoItem(int id, String todo, boolean completed) {
        this.id = id;
        this.todo = todo;
        this.completed = completed;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
