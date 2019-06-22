package com.naveen.todo.controller;

import com.naveen.todo.model.ToDoItem;
import com.naveen.todo.repository.ToDoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path="/todo")
public class ToDoItemController {

    @Autowired
    ToDoItemRepository toDoItemRepository;

    @PostMapping(path="/save",  produces = {MediaType.APPLICATION_JSON_VALUE})
    public ToDoItem saveUpdateToDo(@RequestBody ToDoItem todo){
        return toDoItemRepository.save(todo);
    }

    @GetMapping(value="getAll", produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public List<ToDoItem> getAllToDo(){
        return toDoItemRepository.findAll();
    }


}
